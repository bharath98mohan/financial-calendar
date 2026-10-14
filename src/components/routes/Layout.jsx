import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  TrendingUp,
  CreditCard,
  Landmark,
  BarChart3,
  Briefcase,
  Plus,
  Edit2,
} from "lucide-react";

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { id: "calendar", label: "Calendar", icon: CalendarDays, path: "/calendar" },
  { id: "sips", label: "SIPs", icon: TrendingUp, path: "/sips" },
  { id: "emis", label: "EMIs", icon: CreditCard, path: "/emis" },
  { id: "salary", label: "Salary", icon: Briefcase, path: "/salary" },
  { id: "bank", label: "Bank Interest", icon: Landmark, path: "/bank" },
  { id: "bonds", label: "Bonds", icon: BarChart3, path: "/bonds" },
];

const SUBTITLES = {
  dashboard: "Your monthly financial overview",
  calendar: "View all financial events by date",
  sips: "Manage your SIP investments",
  emis: "Track loan EMI payments",
  salary: "Salary credit details",
  bank: "Fixed deposits & savings interest",
  bonds: "Bond coupon payments",
};

export default function Layout({ setModal, salary, children }) {
  const location = useLocation();

  // Resolve the active tab from the current path (exact match).
  const activeTab =
    TABS.find((t) => t.path === location.pathname)?.id || "dashboard";

  return (
    <div className="app">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon">₹</span>
          <div>
            <div className="brand-title">FinPlan</div>
            <div className="brand-sub">Financial Calendar</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {TABS.map(({ id, label, icon: Icon, path }) => (
            <Link
              key={id}
              to={path}
              className={`nav-item ${activeTab === id ? "active" : ""}`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-text">
            Current Month: <strong>October 2026</strong>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="main-content">
        <header className="top-bar">
          <div>
            <h1 className="page-title">
              {TABS.find((t) => t.id === activeTab)?.label}
            </h1>
            <p className="page-sub">{SUBTITLES[activeTab]}</p>
          </div>
          <div className="top-bar-actions">
            {activeTab === "sips" && (
              <button
                className="btn-primary blue-btn"
                onClick={() => setModal({ type: "sip", data: null })}
              >
                <Plus size={16} /> Add SIP
              </button>
            )}
            {activeTab === "emis" && (
              <button
                className="btn-primary red-btn"
                onClick={() => setModal({ type: "emi", data: null })}
              >
                <Plus size={16} /> Add EMI
              </button>
            )}
            {activeTab === "bank" && (
              <button
                className="btn-primary amber-btn"
                onClick={() => setModal({ type: "bank", data: null })}
              >
                <Plus size={16} /> Add FD / Savings
              </button>
            )}
            {activeTab === "bonds" && (
              <button
                className="btn-primary purple-btn"
                onClick={() => setModal({ type: "bond", data: null })}
              >
                <Plus size={16} /> Add Bond
              </button>
            )}
            {activeTab === "salary" && (
              <button
                className="btn-primary green-btn"
                onClick={() => setModal({ type: "salary", data: salary })}
              >
                <Edit2 size={16} /> Edit Salary
              </button>
            )}
          </div>
        </header>

        <div className="content-area">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
}