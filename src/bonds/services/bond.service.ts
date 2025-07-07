import http from '@/shared/services/http-common';
import type { BondResponse } from '../model/response/bond.response';
import type { BondRequest } from '../model/request/bond.request';
import type { UpdateBondRequest } from '../model/request/update-bond.request';
import type { BondMetricsResponse } from '../model/response/bond-metrics.response';
import type { CashFlowItemResponse } from '../model/response/cash-flow-item.response';

export class BondService {
  async createBond(bondRequest: BondRequest): Promise<BondResponse> {
    const response = await http.post<BondResponse>('/bonds', bondRequest);
    return response.data;
  }

  async getBondsByUserId(userId: number): Promise<BondResponse[]> {
    const response = await http.get(`/bonds/user-id/${userId}`);
    return response.data;
  }

  async getBondById(bondId: number): Promise<BondResponse> {
    const response = await http.get(`/bonds/${bondId}`);
    return response.data;
  }

  async updateBond(bondId: number, bondRequest: UpdateBondRequest): Promise<BondResponse> {
    const response = await http.put<BondResponse>(`/bonds/${bondId}`, bondRequest);
    return response.data;
  }

  async deleteBond(bondId: number): Promise<void> {
    await http.delete(`/bonds/${bondId}`);
  }

  async getBondMetricsByBondId(bondId: number): Promise<BondMetricsResponse> {
    const response = await http.get(`/bonds/get-bond-metrics/${bondId}`);
    return response.data;
  }

  async getCashFlowItemsByBondId(bondId: number): Promise<CashFlowItemResponse[]> {
    const response = await http.get(`/bonds/get-cash-flow-items/${bondId}`);
    return response.data;
  }
}
