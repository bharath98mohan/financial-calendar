import {
  formatCurrency,
  calculateOutstandingBalance,
  calculateTotalEMIInterest,
  getOrdinal,
} from "../utils/financialUtils.jsx";
import { CreditCard, X, Edit2, ToggleLeft, ToggleRight } from "lucide-react";

export default function EMICard({ emi, onEdit, onToggle, onDelete }) {
  const outstanding = calculateOutstandingBalance(
    emi.principal,
    emi.interestRate,
    emi.tenureMonths,
    emi.paidMonths
  );
  const totalInterest = calculateTotalEMIInterest(
    emi.emi,
    emi.tenureMonths,
    emi.principal
  );
  const progressPercent = Math.min(
    100,
    (emi.paidMonths / emi.tenureMonths) * 100
  );
  const remainingMonths = emi.tenureMonths - emi.paidMonths;

  return (
    <div className={`emi-card card ${!emi.isActive ? "inactive" : ""}`}>
      <div className="card-header">
        <div className="card-icon red-icon">
          <CreditCard size={18} />
        </div>
        <div className="card-title">
          <h4>{emi.name}</h4>
          <span className="badge red-badge">{emi.interestRate}% p.a.</span>
        </div>
        <div className="card-actions">
          <button onClick={() => onEdit(emi)} className="icon-btn" title="Edit">
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => onToggle(emi.id)}
            className="icon-btn"
            title={emi.isActive ? "Pause" : "Resume"}
          >
            {emi.isActive ? (
              <ToggleRight size={18} className="green" />
            ) : (
              <ToggleLeft size={18} className="gray" />
            )}
          </button>
          <button
            onClick={() => onDelete(emi.id)}
            className="icon-btn danger"
            title="Delete"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="card-body">
        <div className="stat-row">
          <div className="stat">
            <span className="stat-label">Monthly EMI</span>
            <span className="stat-value red">{formatCurrency(emi.emi)}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Debit Date</span>
            <span className="stat-value">{getOrdinal(emi.dayOfMonth)} of every month</span>
          </div>
        </div>

        <div className="stat-row">
          <div className="stat">
            <span className="stat-label">Principal</span>
            <span className="stat-value">{formatCurrency(emi.principal)}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Outstanding</span>
            <span className="stat-value red">{formatCurrency(outstanding)}</span>
          </div>
        </div>

        <div className="stat-row">
          <div className="stat">
            <span className="stat-label">Total Interest</span>
            <span className="stat-value">{formatCurrency(totalInterest)}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Remaining</span>
            <span className="stat-value">{remainingMonths} months</span>
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-label">
            <span>Repayment Progress</span>
            <span>{progressPercent.toFixed(1)}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill red-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="progress-sub">
            <span>{emi.paidMonths} paid</span>
            <span>{emi.tenureMonths} total</span>
          </div>
        </div>
      </div>

      {!emi.isActive && <div className="inactive-banner">⏸ Paused</div>}
    </div>
  );
}
