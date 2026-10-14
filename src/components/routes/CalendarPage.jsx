import CalendarView from "../CalendarView.jsx";

export default function CalendarPage({ sips, emis, salary, bonds }) {
  return (
    <CalendarView
      sips={sips}
      emis={emis}
      salary={salary}
      bonds={bonds}
    />
  );
}