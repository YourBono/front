export interface CashFlowItemResponse {
  id: number;
  bondId: number;
  period: number;
  paymentDate: string; // ISO date string
  isGracePeriod: boolean;
  initialBalance: number;
  interest: number;
  amortization: number;
  finalBalance: number;
  totalPayment: number;
  issuerCashFlow: number;
  bondHolderCashFlow: number;
  presentCashFlow: number;
  presentCashFlowTimesPeriod: number;
  convexityFactor: number;
}