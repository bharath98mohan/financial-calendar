import { useState } from "react";
import { X } from "lucide-react";

function FormField({ label, type = "text", value, onChange, min, max, step, required, placeholder, options }) {
  if (type === "select") {
    return (
      <div className="form-field">
        <label>{label}</label>
        <select value={value} onChange={(e) => onChange(e.target.value)} required={required}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  return (
    <div className="form-field">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(type === "number" ? parseFloat(e.target.value) || 0 : e.target.value)
        }
        min={min}
        max={max}
        step={step}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
}

// ─────── SIP Form ───────
export function SIPForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(
    initial || {
      name: "",
      amount: 1000,
      dayOfMonth: 1,
      startDate: new Date().toISOString().split("T")[0],
      category: "Equity",
      isActive: true,
    }
  );

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{initial ? "Edit SIP" : "Add SIP"}</h3>
          <button className="icon-btn" onClick={onClose}><X size={16} /></button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <FormField label="Fund Name" value={form.name} onChange={set("name")} required placeholder="e.g. Nifty 50 Index Fund" />
          <FormField label="Monthly Amount (₹)" type="number" value={form.amount} onChange={set("amount")} min={100} step={100} required />
          <FormField label="Debit Day of Month" type="number" value={form.dayOfMonth} onChange={set("dayOfMonth")} min={1} max={28} required />
          <FormField label="Start Date" type="date" value={form.startDate} onChange={set("startDate")} required />
          <FormField label="Category" type="select" value={form.category} onChange={set("category")}
            options={["Equity","Mid Cap","Small Cap","Debt","Hybrid","ELSS","Index"].map(c => ({ value: c, label: c }))} />
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary blue-btn">Save SIP</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────── EMI Form ───────
export function EMIForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(
    initial || {
      name: "",
      principal: 100000,
      emi: 0,
      interestRate: 8.5,
      tenureMonths: 60,
      paidMonths: 0,
      dayOfMonth: 1,
      startDate: new Date().toISOString().split("T")[0],
      isActive: true,
    }
  );

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Auto-calculate EMI if not provided
    let finalForm = { ...form };
    if (!form.emi || form.emi === 0) {
      const r = form.interestRate / 100 / 12;
      const n = form.tenureMonths;
      const emi = r === 0 ? form.principal / n : (form.principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      finalForm = { ...form, emi: Math.round(emi) };
    }
    onSave(finalForm);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{initial ? "Edit EMI" : "Add EMI"}</h3>
          <button className="icon-btn" onClick={onClose}><X size={16} /></button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <FormField label="Loan Name" value={form.name} onChange={set("name")} required placeholder="e.g. Home Loan - SBI" />
          <FormField label="Principal Amount (₹)" type="number" value={form.principal} onChange={set("principal")} min={1000} step={1000} required />
          <FormField label="Annual Interest Rate (%)" type="number" value={form.interestRate} onChange={set("interestRate")} min={0} max={50} step={0.1} required />
          <FormField label="Tenure (months)" type="number" value={form.tenureMonths} onChange={set("tenureMonths")} min={1} max={480} required />
          <FormField label="Monthly EMI (₹) — leave 0 to auto-calculate" type="number" value={form.emi} onChange={set("emi")} min={0} step={100} />
          <FormField label="Months Already Paid" type="number" value={form.paidMonths} onChange={set("paidMonths")} min={0} />
          <FormField label="EMI Debit Day" type="number" value={form.dayOfMonth} onChange={set("dayOfMonth")} min={1} max={28} required />
          <FormField label="Start Date" type="date" value={form.startDate} onChange={set("startDate")} required />
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary red-btn">Save EMI</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────── Salary Form ───────
export function SalaryForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(
    initial || {
      amount: 50000,
      dayOfMonth: 1,
      employer: "",
      accountNumber: "",
    }
  );

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Edit Salary Details</h3>
          <button className="icon-btn" onClick={onClose}><X size={16} /></button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <FormField label="Monthly Salary (₹)" type="number" value={form.amount} onChange={set("amount")} min={0} step={1000} required />
          <FormField label="Credit Day of Month" type="number" value={form.dayOfMonth} onChange={set("dayOfMonth")} min={1} max={31} required />
          <FormField label="Employer Name" value={form.employer} onChange={set("employer")} placeholder="e.g. Tech Corp Pvt. Ltd." />
          <FormField label="Account Number (masked)" value={form.accountNumber} onChange={set("accountNumber")} placeholder="e.g. XXXX1234" />
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary green-btn">Save Salary</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────── Bank FD / Interest Form ───────
export function BankFDForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(
    initial || {
      name: "",
      principal: 100000,
      interestRate: 7.0,
      compoundingFrequency: "quarterly",
      startDate: new Date().toISOString().split("T")[0],
      maturityDate: "",
      tenureMonths: 12,
    }
  );

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{initial ? "Edit FD / Savings" : "Add FD / Savings"}</h3>
          <button className="icon-btn" onClick={onClose}><X size={16} /></button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <FormField label="Name" value={form.name} onChange={set("name")} required placeholder="e.g. FD - SBI" />
          <FormField label="Principal (₹)" type="number" value={form.principal} onChange={set("principal")} min={1000} step={1000} required />
          <FormField label="Interest Rate (% p.a.)" type="number" value={form.interestRate} onChange={set("interestRate")} min={0} max={30} step={0.1} required />
          <FormField label="Compounding Frequency" type="select" value={form.compoundingFrequency} onChange={set("compoundingFrequency")}
            options={[
              { value: "monthly", label: "Monthly" },
              { value: "quarterly", label: "Quarterly" },
              { value: "half-yearly", label: "Half-Yearly" },
              { value: "annually", label: "Annually" },
            ]} />
          <FormField label="Tenure (months)" type="number" value={form.tenureMonths} onChange={set("tenureMonths")} min={1} />
          <FormField label="Start Date" type="date" value={form.startDate} onChange={set("startDate")} required />
          <FormField label="Maturity Date" type="date" value={form.maturityDate} onChange={set("maturityDate")} />
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary amber-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────── Bond Form ───────
export function BondForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(
    initial || {
      name: "",
      faceValue: 1000,
      couponRate: 7.5,
      paymentFrequency: "semi-annual",
      purchaseDate: new Date().toISOString().split("T")[0],
      maturityDate: "",
      units: 1,
    }
  );

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{initial ? "Edit Bond" : "Add Bond"}</h3>
          <button className="icon-btn" onClick={onClose}><X size={16} /></button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <FormField label="Bond Name" value={form.name} onChange={set("name")} required placeholder="e.g. Govt. Bond 2030" />
          <FormField label="Face Value per Unit (₹)" type="number" value={form.faceValue} onChange={set("faceValue")} min={1} step={1000} required />
          <FormField label="Number of Units" type="number" value={form.units} onChange={set("units")} min={1} required />
          <FormField label="Coupon Rate (% p.a.)" type="number" value={form.couponRate} onChange={set("couponRate")} min={0} max={30} step={0.01} required />
          <FormField label="Payment Frequency" type="select" value={form.paymentFrequency} onChange={set("paymentFrequency")}
            options={[
              { value: "monthly", label: "Monthly" },
              { value: "quarterly", label: "Quarterly" },
              { value: "semi-annual", label: "Semi-Annual" },
              { value: "annual", label: "Annual" },
            ]} />
          <FormField label="Purchase Date" type="date" value={form.purchaseDate} onChange={set("purchaseDate")} required />
          <FormField label="Maturity Date" type="date" value={form.maturityDate} onChange={set("maturityDate")} required />
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary purple-btn">Save Bond</button>
          </div>
        </form>
      </div>
    </div>
  );
}
