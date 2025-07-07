export interface BondMetricsResponse {
  id: number;
  bondId: number;
  maxPrice: number;
  duration: number;
  convexity: number;
  modifiedDuration: number;
  tcea: number; // Total Cost of Effective Acquisition
  trea: number; // Total Return on Effective Acquisition
}