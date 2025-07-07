import type { BondMetricsResponse } from "../../model/response/bond-metrics.response";

const formatPercent = (val: number) => `${(val * 100).toFixed(2)}%`;
const formatNumber = (val: number) => val.toFixed(2);

export const BondAnalysisSummaryComponent: React.FC<BondMetricsResponse> = ({
  maxPrice,
  duration,
  convexity,
  modifiedDuration,
  tcea,
  trea,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
      <Card title="Precio Máximo" value={`S/ ${formatNumber(maxPrice)}`} />
      <Card title="Duración" value={formatNumber(duration)} />
      <Card title="Duración Modificada" value={formatNumber(modifiedDuration)} />
      <Card title="Convexidad" value={formatNumber(convexity)} />
      <Card title="TCEA Emisor" value={formatPercent(tcea)} />
      <Card title="TREA Bonista" value={formatPercent(trea)} />
    </div>
  );
};

const Card = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-white border shadow-sm rounded-lg p-4 text-center">
    <h4 className="text-sm text-gray-600">{title}</h4>
    <p className="text-xl font-semibold text-gray-800">{value}</p>
  </div>
);
