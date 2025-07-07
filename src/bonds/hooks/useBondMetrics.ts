import { useEffect, useState } from "react";
import { BondService } from "../services/bond.service";
import type { BondMetricsResponse } from "../model/response/bond-metrics.response";

export function useBondMetrics(bondId: number) {
  const [data, setData] = useState<BondMetricsResponse>({} as BondMetricsResponse);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = async () => {
    setLoading(true);
    try {
      const resp = await new BondService().getBondMetricsByBondId(bondId);
      setData(resp);
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
