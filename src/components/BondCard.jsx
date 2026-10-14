import {
  formatCurrency,
  calculateBondPayments,
  getBondPaymentDates,
} from "../utils/financialUtils.jsx";
import { BarChart3, X, Edit2 } from "lucide-react";

const FREQUENCY_LABEL = {
  monthly: "Monthly",
  quarterly: "Quarterly",
  "semi-annual": "Semi-Annual",
  annual: "Annual",
};

export default function BondCard({ bond, onEdit, onDelete }) {
  const payments = calculateBondPayments(
    bond.faceValue,
    bond.couponRate,
    bond.paymentFrequency,
    bond.units
  );

  const upcomingDates = getBondPaymentDates(
    bond.purchaseDate,
    bond.paymentFrequency,
    bond.maturityDate,
    3
  );

  const daysToMaturity = Math.max(
    0,
    Math.ceil(
      (new Date(bond.maturityDate) - new Date()) / (1000 * 60 * 60 * 24)
    )
  );

  const yearsToMaturity = (daysToMaturity / 365).toFixed(1);

  return (
    <div className="bond-card card">
      <div className="card-header">
        <div className="card-icon purple-icon">
          <BarChart3 size={18} />
        </div>
        <div className="card-title">
          <h4>{bond.name}</h4>
          <span className="badge purple-badge">
            {FREQUENCY_LABEL[bond.paymentFrequency]} Coupon
          </span>
        </div>
        <div className="card-actions">
          <button onClick={() => onEdit(bond)} className="icon-btn" title="Edit">
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => onDelete(bond.id)}
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
            <span className="stat-label">Face Value × Units</span>
            <span className="stat-value">
              {formatCurrency(bond.faceValue)} × {bond.units}
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">Total Value</span>
            <span className="stat-value">{formatCurrency(payments.totalFaceValue)}</span>
          </div>
        </div>

        <div className="stat-row">
          <div className="stat">
            <span className="stat-label">Coupon Rate</span>
            <span className="stat-value purple">{bond.couponRate}% p.a.</span>
          </div>
          <div className="stat">
            <span className="stat-label">Payout per Period</span>
            <span className="stat-value green">{formatCurrency(payments.paymentPerPeriod)}</span>
          </div>
        </div>

        <div className="stat-row">
          <div className="stat">
            <span className="stat-label">Monthly Equivalent</span>
            <span className="stat-value green">{formatCurrency(payments.monthlyEquivalent)}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Annual Coupon</span>
            <span className="stat-value green">{formatCurrency(payments.annualCoupon)}</span>
          </div>
        </div>

        {upcomingDates.length > 0 && (
          <div className="upcoming-section">
            <span className="upcoming-label">Upcoming Payments</span>
            <div className="upcoming-dates">
              {upcomingDates.map((date, i) => (
                <span key={i} className="date-chip purple-chip">
                  {date.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="maturity-info">
          <span>
            Matures:{" "}
            {new Date(bond.maturityDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="days-badge">
            {yearsToMaturity} years left
          </span>
        </div>
      </div>
    </div>
  );
}
