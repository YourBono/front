import { useEffect, useState } from "react";
import { BondService } from "../services/bond.service";
import type { CashFlowItemResponse } from "../model/response/cash-flow-item.response";

export function useCashFlow(bondId: number) {
  const [data, setData] = useState<CashFlowItemResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = async () => {
    setLoading(true);
    try {
      const resp = await new BondService().getCashFlowItemsByBondId(bondId);
      setData(resp ?? []);
    } catch {
      setError("Error al obtener el flujo de caja");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [bondId]);

  return { data, loading, error };
}
