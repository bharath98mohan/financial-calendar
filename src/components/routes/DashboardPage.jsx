import Dashboard from "../Dashboard.jsx";

export default function DashboardPage({ sips, emis, salary, bankFDs, bonds }) {
  return (
    <Dashboard
      sips={sips}
      emis={emis}
      salary={salary}
      bankFDs={bankFDs}
      bonds={bonds}
    />
  );
}