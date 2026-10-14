// Initial sample data for the financial planner
export const initialSIPs = [
  {
    id: 1,
    name: "Nifty 50 Index Fund",
    amount: 5000,
    dayOfMonth: 5,
    startDate: "2024-01-05",
    category: "Equity",
    isActive: true,
  },
  {
    id: 2,
    name: "HDFC Mid Cap Fund",
    amount: 3000,
    dayOfMonth: 10,
    startDate: "2024-02-10",
    category: "Mid Cap",
    isActive: true,
  },
];

export const initialEMIs = [
  {
    id: 1,
    name: "Home Loan - SBI",
    principal: 3000000,
    emi: 28500,
    interestRate: 8.5,
    tenureMonths: 240,
    paidMonths: 12,
    dayOfMonth: 3,
    startDate: "2023-01-03",
    isActive: true,
  },
  {
    id: 2,
    name: "Car Loan - HDFC",
    principal: 800000,
    emi: 15200,
    interestRate: 9.0,
    tenureMonths: 60,
    paidMonths: 8,
    dayOfMonth: 15,
    startDate: "2023-06-15",
    isActive: true,
  },
];

export const initialSalary = {
  amount: 85000,
  dayOfMonth: 1,
  employer: "Tech Corp Pvt. Ltd.",
  accountNumber: "XXXX1234",
};

export const initialBankInterests = [
  {
    id: 1,
    name: "FD - SBI",
    principal: 200000,
    interestRate: 7.1,
    compoundingFrequency: "quarterly",
    startDate: "2024-01-01",
    maturityDate: "2025-01-01",
    tenureMonths: 12,
  },
  {
    id: 2,
    name: "Savings Account - HDFC",
    principal: 150000,
    interestRate: 3.5,
    compoundingFrequency: "monthly",
    startDate: "2024-01-01",
    maturityDate: "2099-12-31",
    tenureMonths: null,
  },
];

export const initialBonds = [
  {
    id: 1,
    name: "Govt. Bond 2030",
    faceValue: 100000,
    couponRate: 7.5,
    paymentFrequency: "semi-annual",
    purchaseDate: "2023-07-01",
    maturityDate: "2030-07-01",
    units: 5,
  },
  {
    id: 2,
    name: "RBI Floating Rate Bond",
    faceValue: 50000,
    couponRate: 8.05,
    paymentFrequency: "semi-annual",
    purchaseDate: "2024-01-15",
    maturityDate: "2031-01-15",
    units: 10,
  },
];
