export interface BondResponse {
  id: number;
  userId: number;
  name: string;
  nominalValue: number;
  marketValue: number;
  duration: number;
  frequency: number;
  interestRateTypeId: number;
  interestRate: number;
  capitalization: number;
  discountRate: number;
  emissionDate: string;
  gracePeriodTypeId: number;
  gracePeriodDuration: number;
  currencyTypeId: number,
  premiumRate: number,
  structuredRate: number,
  placementRate: number,
  floatingRate: number,
  cavaliRate: number,
  daysPerYear: number,
  taxRate: number,
}