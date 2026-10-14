import { useState } from "react";
import { formatCurrency, getOrdinal } from "../utils/financialUtils.jsx";
import {
  getMonthEvents,
  DAY_NAMES,
  MONTH_NAMES,
} from "../utils/financialUtils.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

const EVENT_COLORS = {
  salary: { bg: "rgba(34,197,94,0.15)", border: "#22c55e", text: "#15803d" },
  sip: { bg: "rgba(59,130,246,0.15)", border: "#3b82f6", text: "#1d4ed8" },
  emi: { bg: "rgba(239,68,68,0.15)", border: "#ef4444", text: "#b91c1c" },
  bond: { bg: "rgba(168,85,247,0.15)", border: "#a855f7", text: "#7e22ce" },
};

function CalendarDay({ day, events, isToday, isCurrentMonth }) {
  const [showPopup, setShowPopup] = useState(false);
  const dayEvents = events.filter((e) => e.day === day);

  return (
    <div
      className={`calendar-day ${isToday ? "today" : ""} ${!isCurrentMonth ? "other-month" : ""} ${dayEvents.length > 0 ? "has-events" : ""}`}
      onClick={() => dayEvents.length > 0 && setShowPopup(!showPopup)}
    >
      <span className="day-number">{day}</span>
      <div className="day-events">
        {dayEvents.slice(0, 3).map((event, i) => (
          <div
            key={i}
            className="event-pip"
            style={{
              backgroundColor: EVENT_COLORS[event.type]?.border || "#999",
            }}
            title={event.title}
          />
        ))}
        {dayEvents.length > 3 && (
          <span className="more-events">+{dayEvents.length - 3}</span>
        )}
      </div>

      {showPopup && dayEvents.length > 0 && (
        <div className="day-popup" onClick={(e) => e.stopPropagation()}>
          <button className="popup-close" onClick={() => setShowPopup(false)}>
            ×
          </button>
          <div className="popup-title">{getOrdinal(day)} Events</div>
          {dayEvents.map((event, i) => (
            <div
              key={i}
              className="popup-event"
              style={{
                backgroundColor: EVENT_COLORS[event.type]?.bg,
                borderLeft: `3px solid ${EVENT_COLORS[event.type]?.border}`,
              }}
            >
              <div className="popup-event-name">{event.title}</div>
              <div className="popup-event-sub">{event.subtitle}</div>
              <div
                className="popup-event-amount"
                style={{ color: event.amount > 0 ? "#16a34a" : "#dc2626" }}
              >
                {event.amount > 0 ? "+" : ""}
                {formatCurrency(Math.abs(event.amount))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CalendarView({ sips, emis, salary, bonds }) {
  const today = new Date();
  const [viewDate, setViewDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });

  const { year, month } = viewDate;

  const events = getMonthEvents(year, month, sips, emis, salary, bonds);

  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysInPrevMonth = new Date(year, month - 1, 0).getDate();

  const goToPrev = () => {
    setViewDate((prev) => {
      if (prev.month === 1) return { year: prev.year - 1, month: 12 };
      return { year: prev.year, month: prev.month - 1 };
    });
  };

  const goToNext = () => {
    setViewDate((prev) => {
      if (prev.month === 12) return { year: prev.year + 1, month: 1 };
      return { year: prev.year, month: prev.month + 1 };
    });
  };

  const goToToday = () => {
    setViewDate({ year: today.getFullYear(), month: today.getMonth() + 1 });
  };

  const cells = [];

  // Prev month trailing days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    cells.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d,
      isCurrentMonth: true,
      isToday:
        d === today.getDate() &&
        month === today.getMonth() + 1 &&
        year === today.getFullYear(),
    });
  }

  // Next month leading days
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, isCurrentMonth: false });
  }

  // Legend
  const legendItems = [
    { type: "salary", label: "Salary Credit" },
    { type: "sip", label: "SIP Debit" },
    { type: "emi", label: "EMI Debit" },
    { type: "bond", label: "Bond Payout" },
  ];

  return (
    <div className="calendar-view">
      <div className="calendar-nav">
        <div className="calendar-nav-left">
          <button className="nav-btn" onClick={goToPrev}>
            <ChevronLeft size={18} />
          </button>
          <h2 className="calendar-month-title">
            {MONTH_NAMES[month - 1]} {year}
          </h2>
          <button className="nav-btn" onClick={goToNext}>
            <ChevronRight size={18} />
          </button>
        </div>
        <button className="today-btn" onClick={goToToday}>
          Today
        </button>
      </div>

      <div className="calendar-legend">
        {legendItems.map((item) => (
          <div key={item.type} className="legend-item">
            <div
              className="legend-dot"
              style={{ backgroundColor: EVENT_COLORS[item.type]?.border }}
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {DAY_NAMES.map((d) => (
          <div key={d} className="calendar-day-header">
            {d}
          </div>
        ))}
        {cells.map((cell, i) => (
          <CalendarDay
            key={i}
            day={cell.day}
            events={cell.isCurrentMonth ? events : []}
            isToday={cell.isToday || false}
            isCurrentMonth={cell.isCurrentMonth}
          />
        ))}
      </div>

      <div className="event-list-section">
        <h3 className="event-list-title">
          Events in {MONTH_NAMES[month - 1]} {year}
        </h3>
        {events.length === 0 ? (
          <p className="no-events">No scheduled events this month.</p>
        ) : (
          <div className="event-list">
            {events.map((event, i) => (
              <div key={i} className="event-list-item">
                <div className="event-list-day">
                  <div
                    className="event-dot"
                    style={{ backgroundColor: EVENT_COLORS[event.type]?.border }}
                  />
                  <span className="event-day-num">{getOrdinal(event.day)}</span>
                </div>
                <div className="event-list-info">
                  <span className="event-list-name">{event.title}</span>
                  <span className="event-list-sub">{event.subtitle}</span>
                </div>
                <span
                  className="event-list-amount"
                  style={{ color: event.amount > 0 ? "#16a34a" : "#dc2626" }}
                >
                  {event.amount > 0 ? "+" : ""}
                  {formatCurrency(Math.abs(event.amount))}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
