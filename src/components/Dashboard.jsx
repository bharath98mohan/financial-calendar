import {
  formatCurrency,
  calculateMonthlyCashFlow,
} from "../utils/financialUtils.jsx";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet,
  PiggyBank,
  BarChart3,
} from "lucide-react";

function StatCard({ icon: Icon, label, value, color, sub }) {
  return (
    <div className={`stat-card ${color}-card`}>
      <div className="stat-card-icon">
        <Icon size={22} />
      </div>
      <div className="stat-card-body">
        <span className="stat-card-label">{label}</span>
        <span className={`stat-card-value ${color}-text`}>{value}</span>
        {sub && <span className="stat-card-sub">{sub}</span>}
      </div>
    </div>
  );
}

export default function Dashboard({ sips, emis, salary, bankFDs, bonds }) {
  const cashflow = calculateMonthlyCashFlow(sips, emis, salary, bonds);

  const totalBankInterestMonthly = bankFDs.reduce((sum, fd) => {
    const tenure = fd.tenureMonths || 12;
    const n =
      fd.compoundingFrequency === "monthly"
        ? 12
        : fd.compoundingFrequency === "quarterly"
        ? 4
        : fd.compoundingFrequency === "half-yearly"
        ? 2
        : 1;
    const t = tenure / 12;
    const r = fd.interestRate / 100;
    const maturity = fd.principal * Math.pow(1 + r / n, n * t);
    const monthly = (maturity - fd.principal) / tenure;
    return sum + monthly;
  }, 0);

  const totalBondAnnual = bonds.reduce((sum, bond) => {
    return sum + (bond.faceValue * bond.units * bond.couponRate) / 100;
  }, 0);

  const totalEMIOutstanding = emis
    .filter((e) => e.isActive)
    .reduce((sum, e) => {
      const r = e.interestRate / 100 / 12;
      const outstanding =
        r === 0
          ? e.principal - (e.principal / e.tenureMonths) * e.paidMonths
          : e.principal * Math.pow(1 + r, e.paidMonths) -
            e.emi * ((Math.pow(1 + r, e.paidMonths) - 1) / r);
      return sum + Math.max(0, outstanding);
    }, 0);

  const sipSavingsRate =
    cashflow.salaryIncome > 0
      ? ((cashflow.totalSIP / cashflow.salaryIncome) * 100).toFixed(1)
      : 0;

  return (
    <div className="dashboard">
      <h2 className="section-title">Monthly Cash Flow Summary</h2>

      <div className="dashboard-grid">
        <StatCard
          icon={DollarSign}
          label="Salary Income"
          value={formatCurrency(cashflow.salaryIncome)}
          color="green"
          sub={`Credited on ${salary ? salary.dayOfMonth : "-"}th`}
        />
        <StatCard
          icon={TrendingDown}
          label="Total EMI Outflow"
          value={formatCurrency(cashflow.totalEMI)}
          color="red"
          sub={`${emis.filter((e) => e.isActive).length} active loans`}
        />
        <StatCard
          icon={PiggyBank}
          label="Total SIP Investment"
          value={formatCurrency(cashflow.totalSIP)}
          color="blue"
          sub={`${sipSavingsRate}% of salary`}
        />
        <StatCard
          icon={BarChart3}
          label="Bond Income (Monthly)"
          value={formatCurrency(cashflow.totalBondIncome)}
          color="purple"
          sub={`${formatCurrency(totalBondAnnual)} annually`}
        />
        <StatCard
          icon={Wallet}
          label="Bank Interest (Monthly)"
          value={formatCurrency(totalBankInterestMonthly)}
          color="amber"
          sub={`${bankFDs.length} instruments`}
        />
        <StatCard
          icon={cashflow.netCashFlow >= 0 ? TrendingUp : TrendingDown}
          label="Net Cash Flow"
          value={formatCurrency(Math.abs(cashflow.netCashFlow))}
          color={cashflow.netCashFlow >= 0 ? "green" : "red"}
          sub={cashflow.netCashFlow >= 0 ? "Monthly surplus" : "Monthly deficit"}
        />
      </div>

      <div className="flow-breakdown">
        <div className="flow-card inflow">
          <h3>Monthly Inflows</h3>
          <div className="flow-item">
            <span>Salary</span>
            <span className="green-text">{formatCurrency(cashflow.salaryIncome)}</span>
          </div>
          <div className="flow-item">
            <span>Bond Coupons</span>
            <span className="green-text">{formatCurrency(cashflow.totalBondIncome)}</span>
          </div>
          <div className="flow-item">
            <span>Bank Interest</span>
            <span className="green-text">{formatCurrency(totalBankInterestMonthly)}</span>
          </div>
          <div className="flow-total">
            <span>Total Inflow</span>
            <span className="green-text">
              {formatCurrency(cashflow.salaryIncome + cashflow.totalBondIncome + totalBankInterestMonthly)}
            </span>
          </div>
        </div>

        <div className="flow-card outflow">
          <h3>Monthly Outflows</h3>
          <div className="flow-item">
            <span>EMI Payments</span>
            <span className="red-text">{formatCurrency(cashflow.totalEMI)}</span>
          </div>
          <div className="flow-item">
            <span>SIP Investments</span>
            <span className="blue-text">{formatCurrency(cashflow.totalSIP)}</span>
          </div>
          <div className="flow-total">
            <span>Total Outflow</span>
            <span className="red-text">{formatCurrency(cashflow.totalOutflow)}</span>
          </div>
        </div>

        <div className="flow-card net-card">
          <h3>Loan Overview</h3>
          <div className="flow-item">
            <span>Total Outstanding</span>
            <span className="red-text">{formatCurrency(totalEMIOutstanding)}</span>
          </div>
          <div className="flow-item">
            <span>Active EMIs</span>
            <span>{emis.filter((e) => e.isActive).length}</span>
          </div>
          <div className="flow-item">
            <span>Active SIPs</span>
            <span>{sips.filter((s) => s.isActive).length}</span>
          </div>
          <div className="flow-item">
            <span>Bond Holdings</span>
            <span>{bonds.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
