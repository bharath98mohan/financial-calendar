import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import DashboardPage from "./DashboardPage";
import CalendarPage from "./CalendarPage";
import SIPsPage from "./SIPsPage";
import EMIsPage from "./EMIsPage";
import SalaryPage from "./SalaryPage";
import BankPage from "./BankPage";
import BondsPage from "./BondsPage";

export default function AppRoutes({
  sips,
  emis,
  salary,
  bankFDs,
  bonds,
  setModal,
  toggleSIP,
  toggleEMI,
  deleteSIP,
  deleteEMI,
  deleteBankFD,
  deleteBond,
}) {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout setModal={setModal} salary={salary} />}>
          <Route
            path="/"
            element={
              <DashboardPage
                salary={salary}
                sips={sips}
                emis={emis}
                bankFDs={bankFDs}
                bonds={bonds}
              />
            }
          />
          <Route
            path="/calendar"
            element={
              <CalendarPage
                sips={sips}
                emis={emis}
                salary={salary}
                bonds={bonds}
              />
            }
          />
          <Route
            path="/salary"
            element={
              <SalaryPage
                salary={salary}
                onEdit={() => setModal({ type: "salary", data: salary })}
              />
            }
          />
          <Route
            path="/sips"
            element={
              <SIPsPage
                sips={sips}
                onEdit={(s) => setModal({ type: "sip", data: s })}
                onToggle={toggleSIP}
                onDelete={deleteSIP}
              />
            }
          />
          <Route
            path="/emis"
            element={
              <EMIsPage
                emis={emis}
                onEdit={(e) => setModal({ type: "emi", data: e })}
                onToggle={toggleEMI}
                onDelete={deleteEMI}
              />
            }
          />
          <Route
            path="/bank"
            element={
              <BankPage
                bankFDs={bankFDs}
                onEdit={(b) => setModal({ type: "bank", data: b })}
                onDelete={deleteBankFD}
              />
            }
          />
          <Route
            path="/bonds"
            element={
              <BondsPage
                bonds={bonds}
                onEdit={(b) => setModal({ type: "bond", data: b })}
                onDelete={deleteBond}
              />
            }
          />
          {/* Redirect unknown paths to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}