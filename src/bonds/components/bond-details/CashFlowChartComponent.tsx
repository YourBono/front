// src/bonds/components/CashFlowChartComponent.tsx
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler
} from "chart.js";
import type { CashFlowItemResponse } from "../../model/response/cash-flow-item.response";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip, Filler);

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
        backgroundColor: "rgba(34,197,94,0.1)",
        pointBackgroundColor: "rgb(34,197,94)",
        fill: true,
        tension: 0.4
      },
      {
        label: "Flujo del Emisor",
        data: issuerCF,
        borderColor: "rgb(239,68,68)",
        backgroundColor: "rgba(239,68,68,0.1)",
        pointBackgroundColor: "rgb(239,68,68)",
        fill: true,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false
    },
    plugins: {
      legend: {
        position: 'top' as const
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.y.toFixed(2);
            return `${label}: S/ ${value}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Período"
        }
      },
      y: {
        title: {
          display: true,
          text: "Flujo de Caja (S/)"
        },
        ticks: {
          callback: function (val: number | string) {
            return `S/ ${val}`;
          }
        },
        grid: {
          color: "#e5e7eb"
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
};
