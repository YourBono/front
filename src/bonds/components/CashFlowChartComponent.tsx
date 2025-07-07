import { Line } from "react-chartjs-2";
import type { CashFlowItemResponse } from "../model/response/cash-flow-item.response";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip);

export const CashFlowChartComponent = ({ data }: { data: CashFlowItemResponse[] }) => {
  const labels = data.map((d) => `Periodo ${d.period}`);
  const bondHolderCF = data.map((d) => d.bondHolderCashFlow);
  const issuerCF = data.map((d) => d.issuerCashFlow);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Flujo del Tenedor",
        data: bondHolderCF,
        borderColor: "rgb(34,197,94)",
        backgroundColor: "rgba(34,197,94,0.3)",
        tension: 0.3
      },
      {
        label: "Flujo del Emisor",
        data: issuerCF,
        borderColor: "rgb(239,68,68)",
        backgroundColor: "rgba(239,68,68,0.3)",
        tension: 0.3
      }
    ]
  };

  return <Line data={chartData} />;
};
