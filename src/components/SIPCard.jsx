import { formatCurrency, getOrdinal } from "../utils/financialUtils.jsx";
import { TrendingUp, X, Edit2, ToggleLeft, ToggleRight } from "lucide-react";

export default function SIPCard({ sip, onEdit, onToggle, onDelete }) {
  return (
    <div
      className={`sip-card card ${!sip.isActive ? "inactive" : ""}`}
    >
      <div className="card-header">
        <div className="card-icon blue-icon">
          <TrendingUp size={18} />
        </div>
        <div className="card-title">
          <h4>{sip.name}</h4>
          <span className="badge blue-badge">{sip.category}</span>
        </div>
        <div className="card-actions">
          <button onClick={() => onEdit(sip)} className="icon-btn" title="Edit">
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => onToggle(sip.id)}
            className="icon-btn"
            title={sip.isActive ? "Pause" : "Resume"}
          >
            {sip.isActive ? <ToggleRight size={18} className="green" /> : <ToggleLeft size={18} className="gray" />}
          </button>
          <button
            onClick={() => onDelete(sip.id)}
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
            <span className="stat-label">Monthly SIP</span>
            <span className="stat-value blue">{formatCurrency(sip.amount)}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Debit Date</span>
            <span className="stat-value">{getOrdinal(sip.dayOfMonth)} of every month</span>
          </div>
        </div>
        <div className="stat-row">
          <div className="stat">
            <span className="stat-label">Annual Investment</span>
            <span className="stat-value">{formatCurrency(sip.amount * 12)}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Started</span>
            <span className="stat-value">
              {new Date(sip.startDate).toLocaleDateString("en-IN", {
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {!sip.isActive && (
        <div className="inactive-banner">⏸ Paused</div>
      )}
    </div>
  );
}
