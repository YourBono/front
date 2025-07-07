import { useParams } from "react-router-dom";
import LayoutWithSidebar from "@/shared/layouts/LayoutWithSidebar";
import { CashFlowChartComponent } from "../components/CashFlowChartComponent";
import { CashFlowTableComponent } from "../components/CashFlowTableComponent";
import { useCashFlow } from "../hooks/useCashFlow";

export const BondCashFlowPage: React.FC = () => {
  const { id } = useParams();
  const bondId = Number(id);
  const { data, loading, error } = useCashFlow(bondId);

  return (
    <LayoutWithSidebar activeItem="registro">
      <h1 className="text-2xl font-bold mb-4">Análisis de Flujo de Caja</h1>
      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          <CashFlowChartComponent data={data} />
          <CashFlowTableComponent data={data} />
        </>
      )}
    </LayoutWithSidebar>
  );
};
