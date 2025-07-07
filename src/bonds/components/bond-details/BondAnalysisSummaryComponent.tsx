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
  netPresentValue,
  cok,
  tceaWithShield,
}) => {
  const getNPVInterpretation = () => {
    if (netPresentValue > 0) return "✔️ El bono es rentable (VAN positivo)";
    if (netPresentValue < 0) return "⚠️ El bono no es rentable (VAN negativo)";
    return "ℹ️ El bono es marginalmente viable (VAN cercano a 0)";
  };

  const getTCEAComparison = () => {
    if (tcea > cok) return "📈 La TCEA supera el COK → Buena señal para el emisor";
    if (tcea < cok) return "📉 La TCEA está por debajo del COK → No recomendable";
    return "⚖️ La TCEA es similar al COK → Evaluar con precaución";
  };

  const getTREAComparison = () => {
    if (trea > tcea) return "🟢 La TREA supera la TCEA → Rentabilidad atractiva para el bonista";
    if (trea < tcea) return "🟡 La TREA está por debajo de la TCEA → Rentabilidad reducida";
    return "🟠 La TREA y la TCEA son iguales → Rentabilidad neutra";
  };

  return (
    <div className="space-y-6">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Card title="💰 Precio Máximo" value={`S/ ${formatNumber(maxPrice)}`} />
        <Card title="⏳ Duración" value={formatNumber(duration)} />
        <Card title="📉 Duración Modificada" value={formatNumber(modifiedDuration)} />
        <Card title="📐 Convexidad" value={formatNumber(convexity)} />
        <Card title="📊 TCEA Emisor" value={formatPercent(tcea)} />
        <Card title="📈 TREA Bonista" value={formatPercent(trea)} />
        <Card title="📦 VAN (Valor Actual Neto)" value={`S/ ${formatNumber(netPresentValue)}`} />
        <Card title="🏦 COK (Costo de Capital)" value={formatPercent(cok)} />
        <Card title="🛡️ TCEA con Escudo" value={formatPercent(tceaWithShield)} />
      </div>

      {/* Análisis interpretativo */}
      <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg space-y-4">
        <h3 className="text-lg font-bold text-gray-800">🧠 Interpretación del análisis</h3>

        <div className="text-sm text-gray-700 space-y-2">
          <p><strong>VAN:</strong> {getNPVInterpretation()}</p>
          <p><strong>Comparación TCEA vs COK:</strong> {getTCEAComparison()}</p>
          <p><strong>Comparación TREA vs TCEA:</strong> {getTREAComparison()}</p>
          <p><strong>Convexidad y duración:</strong> Una alta convexidad sugiere menor sensibilidad a cambios en la tasa. La duración modificada indica el nivel de riesgo ante variaciones en el mercado.</p>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-white border shadow-sm rounded-lg p-4 text-center">
    <h4 className="text-sm text-gray-600">{title}</h4>
    <p className="text-xl font-semibold text-gray-800">{value}</p>
  </div>
);
