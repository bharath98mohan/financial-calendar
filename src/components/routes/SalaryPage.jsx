import { formatCurrency, getOrdinal } from "../../utils/financialUtils.jsx";
import { Briefcase } from "lucide-react";

export default function SalaryPage({ salary, onEdit }) {
  return (
    <div className="salary-section">
      <div className="salary-card card">
        <div className="card-header">
          <div className="card-icon green-icon">
            <Briefcase size={20} />
          </div>
          <div className="card-title">
            <h4>Salary Details</h4>
            <span className="badge green-badge">Monthly Credit</span>
          </div>
        </div>
        <div className="card-body">
          <div className="stat-row">
            <div className="stat">
              <span className="stat-label">Monthly Salary</span>
              <span className="stat-value green">{formatCurrency(salary.amount)}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Credit Date</span>
              <span className="stat-value">
                {getOrdinal(salary.dayOfMonth)} of every month
              </span>
            </div>
          </div>
          <div className="stat-row">
            <div className="stat">
              <span className="stat-label">Employer</span>
              <span className="stat-value">{salary.employer || "—"}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Account</span>
              <span className="stat-value">
                {salary.accountNumber || "—"}
              </span>
            </div>
          </div>
          <div className="stat-row">
            <div className="stat">
              <span className="stat-label">Annual CTC</span>
              <span className="stat-value">
                {formatCurrency(salary.amount * 12)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}