import { formatCurrency, calculateBankInterest } from "../utils/financialUtils.jsx";
import { Landmark, X, Edit2 } from "lucide-react";

const FREQUENCY_LABEL = {
  monthly: "Monthly",
  quarterly: "Quarterly",
  "half-yearly": "Half-Yearly",
  annually: "Annually",
};

export default function BankInterestCard({ bankFD, onEdit, onDelete }) {
  const isForever = !bankFD.tenureMonths;
  const tenure = bankFD.tenureMonths || 12;

  const results = calculateBankInterest(
    bankFD.principal,
    bankFD.interestRate,
    tenure,
    bankFD.compoundingFrequency
  );

  const daysToMaturity = bankFD.maturityDate
    ? Math.max(
        0,
        Math.ceil(
          (new Date(bankFD.maturityDate) - new Date()) / (1000 * 60 * 60 * 24)
        )
      )
    : null;

  return (
    <div className="bank-card card">
      <div className="card-header">
        <div className="card-icon amber-icon">
          <Landmark size={18} />
        </div>
        <div className="card-title">
          <h4>{bankFD.name}</h4>
          <span className="badge amber-badge">
            {FREQUENCY_LABEL[bankFD.compoundingFrequency]} Compounding
          </span>
        </div>
        <div className="card-actions">
          <button onClick={() => onEdit(bankFD)} className="icon-btn" title="Edit">
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => onDelete(bankFD.id)}
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
            <span className="stat-label">Principal</span>
            <span className="stat-value">{formatCurrency(bankFD.principal)}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Interest Rate</span>
            <span className="stat-value amber">{bankFD.interestRate}% p.a.</span>
          </div>
        </div>

        <div className="stat-row">
          <div className="stat">
            <span className="stat-label">Monthly Equivalent</span>
            <span className="stat-value green">{formatCurrency(results.monthlyInterest)}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Annual Interest</span>
            <span className="stat-value green">{formatCurrency(results.annualInterest)}</span>
          </div>
        </div>

        {!isForever && (
          <>
            <div className="stat-row">
              <div className="stat">
                <span className="stat-label">Total Interest ({tenure} months)</span>
                <span className="stat-value green">{formatCurrency(results.totalInterest)}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Maturity Amount</span>
                <span className="stat-value">{formatCurrency(results.maturityAmount)}</span>
              </div>
            </div>

            <div className="maturity-info">
              <span>
                Matures:{" "}
                {new Date(bankFD.maturityDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              {daysToMaturity !== null && (
                <span className={`days-badge ${daysToMaturity < 30 ? "urgent" : ""}`}>
                  {daysToMaturity === 0
                    ? "Matures today!"
                    : `${daysToMaturity} days left`}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
