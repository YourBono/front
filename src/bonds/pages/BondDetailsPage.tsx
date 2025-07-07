import { useParams } from "react-router-dom";
import LayoutWithSidebar from "@/shared/layouts/LayoutWithSidebar";
import { CashFlowChartComponent } from "../components/bond-details/CashFlowChartComponent";
import { CashFlowTableComponent } from "../components/bond-details/CashFlowTableComponent";
import { useCashFlow } from "../hooks/useCashFlow";
import { useBondMetrics } from "../hooks/useBondMetrics";
import { BondAnalysisSummaryComponent } from "../components/bond-details/BondAnalysisSummaryComponent";

export const BondDetailsPage: React.FC = () => {
  const { id } = useParams();
  const bondId = Number(id);
  const { data: dataCashFlow, loading: loadingCashFlow, error: errorCashFlow } = useCashFlow(bondId);
  const { data: bondMetrics, loading: loadingBondMetrics, error: errorBondMetrics } = useBondMetrics(bondId);

  return (
    <LayoutWithSidebar activeItem="manage-bonds">
      <h1 className="text-2xl font-bold mb-4 text-(--text-color)">Análisis de Flujo de Caja</h1>
      {(loadingCashFlow || loadingBondMetrics)  && <p>Cargando...</p>}
      {errorCashFlow && <p className="text-red-500">{errorCashFlow}</p>}
      {errorBondMetrics && <p className="text-red-500">{errorBondMetrics}</p>}

      {!loadingCashFlow && !loadingBondMetrics && !errorCashFlow && !errorBondMetrics && (
        <>
          <BondAnalysisSummaryComponent {...bondMetrics} />
          <CashFlowChartComponent data={dataCashFlow} />
          <CashFlowTableComponent data={dataCashFlow} />
        </>
      )}
    </LayoutWithSidebar>
  );
};
