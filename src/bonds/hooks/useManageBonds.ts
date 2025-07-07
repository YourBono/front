// src/bonds/hooks/useManageBonds.ts
import { useState, useEffect } from 'react';
import { BondService } from '../services/bond.service';
import { useAuthenticationStore } from '@/auth/services/authentication.store';
import type { BondResponse } from '../model/response/bond.response';
import type { UpdateBondRequest } from '../model/request/update-bond.request';

export function useManageBonds() {
  const userId = useAuthenticationStore.getState().userId;
  const service = new BondService();

  const [bonds, setBonds] = useState<BondResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<number | undefined>(undefined);

  const fetchBonds = async () => {
    setIsLoading(true); setError(null);
    try {
      const resp = await service.getBondsByUserId(userId);
      setBonds(resp ?? []);
    } catch {
      setError('Error al cargar bonos');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBond = async (id: number) => {
    setActionLoading(id);
    try { await service.deleteBond(id); await fetchBonds(); }
    catch { setError('Error al eliminar bono'); }
    finally { setActionLoading(undefined); }
  };

  const updateBond = async (bondId: number, bond: UpdateBondRequest) => {
    setActionLoading(bondId);
    try { await service.updateBond(bondId, bond); await fetchBonds(); }
    catch { setError('Error al actualizar bono'); }
    finally { setActionLoading(undefined); }
  };

  useEffect(() => {
    const loadBonds = async () => {
      await fetchBonds();
    };
    loadBonds();
  }, []);

  return { bonds, isLoading, error, actionLoading, fetchBonds, deleteBond, updateBond };
}
