import { useState } from "react";
import {
  initialSIPs,
  initialEMIs,
  initialSalary,
  initialBankInterests,
  initialBonds,
} from "./data/initialData.js";
import {
  SIPForm,
  EMIForm,
  SalaryForm,
  BankFDForm,
  BondForm,
} from "./components/Forms.jsx";
import AppRoutes from "./components/routes/index.jsx";

let nextId = 100;

export default function App() {
  const [sips, setSIPs] = useState(initialSIPs);
  const [emis, setEMIs] = useState(initialEMIs);
  const [salary, setSalary] = useState(initialSalary);
  const [bankFDs, setBankFDs] = useState(initialBankInterests);
  const [bonds, setBonds] = useState(initialBonds);

  // Modal state
  const [modal, setModal] = useState(null); // { type, data }

  const closeModal = () => setModal(null);

  // ─── SIP handlers ───
  const saveSIP = (data) => {
    if (data.id) {
      setSIPs((prev) => prev.map((s) => (s.id === data.id ? data : s)));
    } else {
      setSIPs((prev) => [...prev, { ...data, id: ++nextId }]);
    }
    closeModal();
  };
  const toggleSIP = (id) =>
    setSIPs((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  const deleteSIP = (id) => setSIPs((prev) => prev.filter((s) => s.id !== id));

  // ─── EMI handlers ───
  const saveEMI = (data) => {
    if (data.id) {
      setEMIs((prev) => prev.map((e) => (e.id === data.id ? data : e)));
    } else {
      setEMIs((prev) => [...prev, { ...data, id: ++nextId }]);
    }
    closeModal();
  };
  const toggleEMI = (id) =>
    setEMIs((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isActive: !e.isActive } : e))
    );
  const deleteEMI = (id) => setEMIs((prev) => prev.filter((e) => e.id !== id));

  // ─── Salary handler ───
  const saveSalary = (data) => {
    setSalary(data);
    closeModal();
  };

  // ─── Bank FD handlers ───
  const saveBankFD = (data) => {
    if (data.id) {
      setBankFDs((prev) => prev.map((b) => (b.id === data.id ? data : b)));
    } else {
      setBankFDs((prev) => [...prev, { ...data, id: ++nextId }]);
    }
    closeModal();
  };
  const deleteBankFD = (id) =>
    setBankFDs((prev) => prev.filter((b) => b.id !== id));

  // ─── Bond handlers ───
  const saveBond = (data) => {
    if (data.id) {
      setBonds((prev) => prev.map((b) => (b.id === data.id ? data : b)));
    } else {
      setBonds((prev) => [...prev, { ...data, id: ++nextId }]);
    }
    closeModal();
  };
  const deleteBond = (id) =>
    setBonds((prev) => prev.filter((b) => b.id !== id));

  return (
    <>
      <AppRoutes
        sips={sips}
        emis={emis}
        salary={salary}
        bankFDs={bankFDs}
        bonds={bonds}
        setModal={setModal}
        toggleSIP={toggleSIP}
        toggleEMI={toggleEMI}
        deleteSIP={deleteSIP}
        deleteEMI={deleteEMI}
        deleteBankFD={deleteBankFD}
        deleteBond={deleteBond}
      />

      {/* ── Modals ── */}
      {modal?.type === "sip" && (
        <SIPForm
          initial={modal.data}
          onSave={saveSIP}
          onClose={closeModal}
        />
      )}
      {modal?.type === "emi" && (
        <EMIForm
          initial={modal.data}
          onSave={saveEMI}
          onClose={closeModal}
        />
      )}
      {modal?.type === "salary" && (
        <SalaryForm
          initial={modal.data}
          onSave={saveSalary}
          onClose={closeModal}
        />
      )}
      {modal?.type === "bank" && (
        <BankFDForm
          initial={modal.data}
          onSave={saveBankFD}
          onClose={closeModal}
        />
      )}
      {modal?.type === "bond" && (
        <BondForm
          initial={modal.data}
          onSave={saveBond}
          onClose={closeModal}
        />
      )}
    </>
  );
}