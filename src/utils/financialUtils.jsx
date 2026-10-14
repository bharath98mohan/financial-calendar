// Utility functions for financial calculations

/**
 * Format a number as Indian currency (₹)
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format a number as Indian currency with decimals
 */
export const formatCurrencyDecimal = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Get ordinal suffix for a day number
 */
export const getOrdinal = (n) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

/**
 * Calculate EMI using standard formula
 * P * r * (1 + r)^n / ((1 + r)^n - 1)
 */
export const calculateEMI = (principal, annualRate, tenureMonths) => {
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / tenureMonths;
  const emi =
    (principal * r * Math.pow(1 + r, tenureMonths)) /
    (Math.pow(1 + r, tenureMonths) - 1);
  return emi;
};

/**
 * Calculate total interest paid over EMI tenure
 */
export const calculateTotalEMIInterest = (emi, tenureMonths, principal) => {
  return emi * tenureMonths - principal;
};

/**
 * Calculate outstanding EMI balance
 */
export const calculateOutstandingBalance = (
  principal,
  annualRate,
  tenureMonths,
  paidMonths
) => {
  const r = annualRate / 100 / 12;
  if (r === 0) return principal - (principal / tenureMonths) * paidMonths;
  const remainingBalance =
    principal * Math.pow(1 + r, paidMonths) -
    calculateEMI(principal, annualRate, tenureMonths) *
      ((Math.pow(1 + r, paidMonths) - 1) / r);
  return Math.max(0, remainingBalance);
};

/**
 * Calculate bank FD / savings interest
 */
export const calculateBankInterest = (
  principal,
  annualRate,
  tenureMonths,
  compoundingFrequency
) => {
  const n =
    compoundingFrequency === "monthly"
      ? 12
      : compoundingFrequency === "quarterly"
      ? 4
      : compoundingFrequency === "half-yearly"
      ? 2
      : 1; // annually

  const t = tenureMonths / 12;
  const r = annualRate / 100;

  const maturityAmount = principal * Math.pow(1 + r / n, n * t);
  const totalInterest = maturityAmount - principal;
  const monthlyInterest = totalInterest / tenureMonths;

  return {
    maturityAmount,
    totalInterest,
    monthlyInterest,
    annualInterest: totalInterest / t,
  };
};

/**
 * Calculate bond coupon payments
 */
export const calculateBondPayments = (
  faceValue,
  couponRate,
  paymentFrequency,
  units
) => {
  const totalFaceValue = faceValue * units;
  const annualCoupon = (totalFaceValue * couponRate) / 100;

  const periodsPerYear =
    paymentFrequency === "monthly"
      ? 12
      : paymentFrequency === "quarterly"
      ? 4
      : paymentFrequency === "semi-annual"
      ? 2
      : 1;

  const paymentPerPeriod = annualCoupon / periodsPerYear;
  const monthlyEquivalent = annualCoupon / 12;

  return {
    annualCoupon,
    paymentPerPeriod,
    monthlyEquivalent,
    periodsPerYear,
    totalFaceValue,
  };
};

/**
 * Get next N payment dates for a bond
 */
export const getBondPaymentDates = (
  purchaseDate,
  paymentFrequency,
  maturityDate,
  count = 6
) => {
  const periodsPerYear =
    paymentFrequency === "monthly"
      ? 12
      : paymentFrequency === "quarterly"
      ? 4
      : paymentFrequency === "semi-annual"
      ? 2
      : 1;

  const monthsPerPeriod = 12 / periodsPerYear;
  const dates = [];
  let currentDate = new Date(purchaseDate);
  const maturity = new Date(maturityDate);
  const today = new Date();

  // Find first upcoming payment date
  while (currentDate <= today) {
    currentDate = new Date(currentDate);
    currentDate.setMonth(currentDate.getMonth() + monthsPerPeriod);
  }

  while (dates.length < count && currentDate <= maturity) {
    dates.push(new Date(currentDate));
    currentDate = new Date(currentDate);
    currentDate.setMonth(currentDate.getMonth() + monthsPerPeriod);
  }

  return dates;
};

/**
 * Get all financial events for a given month
 */
export const getMonthEvents = (year, month, sips, emis, salary, bonds) => {
  const events = [];

  // Salary event
  if (salary && salary.dayOfMonth) {
    events.push({
      type: "salary",
      day: salary.dayOfMonth,
      title: "Salary Credit",
      subtitle: salary.employer,
      amount: salary.amount,
      color: "green",
    });
  }

  // SIP events
  sips
    .filter((s) => s.isActive)
    .forEach((sip) => {
      events.push({
        type: "sip",
        day: sip.dayOfMonth,
        title: sip.name,
        subtitle: `SIP - ${sip.category}`,
        amount: -sip.amount,
        color: "blue",
      });
    });

  // EMI events
  emis
    .filter((e) => e.isActive)
    .forEach((emi) => {
      events.push({
        type: "emi",
        day: emi.dayOfMonth,
        title: emi.name,
        subtitle: `EMI @ ${emi.interestRate}%`,
        amount: -emi.emi,
        color: "red",
      });
    });

  // Bond payment events
  bonds.forEach((bond) => {
    const dates = getBondPaymentDates(
      bond.purchaseDate,
      bond.paymentFrequency,
      bond.maturityDate,
      24
    );
    dates.forEach((date) => {
      if (date.getFullYear() === year && date.getMonth() + 1 === month) {
        const payments = calculateBondPayments(
          bond.faceValue,
          bond.couponRate,
          bond.paymentFrequency,
          bond.units
        );
        events.push({
          type: "bond",
          day: date.getDate(),
          title: bond.name,
          subtitle: `Bond Coupon @ ${bond.couponRate}%`,
          amount: payments.paymentPerPeriod,
          color: "purple",
        });
      }
    });
  });

  return events.sort((a, b) => a.day - b.day);
};

/**
 * Calculate monthly cash flow summary
 */
export const calculateMonthlyCashFlow = (sips, emis, salary, bonds) => {
  const totalSIP = sips
    .filter((s) => s.isActive)
    .reduce((sum, s) => sum + s.amount, 0);
  const totalEMI = emis
    .filter((e) => e.isActive)
    .reduce((sum, e) => sum + e.emi, 0);
  const salaryIncome = salary ? salary.amount : 0;
  const totalBondIncome = bonds.reduce((sum, bond) => {
    const payments = calculateBondPayments(
      bond.faceValue,
      bond.couponRate,
      bond.paymentFrequency,
      bond.units
    );
    return sum + payments.monthlyEquivalent;
  }, 0);

  const totalOutflow = totalSIP + totalEMI;
  const totalInflow = salaryIncome + totalBondIncome;
  const netCashFlow = totalInflow - totalOutflow;

  return {
    totalSIP,
    totalEMI,
    salaryIncome,
    totalBondIncome,
    totalOutflow,
    totalInflow,
    netCashFlow,
  };
};

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
