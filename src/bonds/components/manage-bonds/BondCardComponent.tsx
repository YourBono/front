import { useNavigate } from "react-router-dom";
import type { BondResponse } from "../../model/response/bond.response";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

const formatCurrency = (value: number, currency: string = 'PEN'): string => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(value);
};

const getCurrencyType = (typeId: number): string => {
  switch (typeId) {
    case 1: return 'S/';
    case 2: return 'US$';
    case 3: return '€';
    default: return 'S/';
  }
};

const getCurrencyCode = (typeId: number): string => {
  switch (typeId) {
    case 1: return 'PEN';
    case 2: return 'USD';
    case 3: return 'EUR';
    default: return 'PEN';
  }
};

const getInterestRateType = (typeId: number): string => {
  switch (typeId) {
    case 1: return 'Nominal';
    case 2: return 'Efectiva';
    default: return 'Fija';
  }
};

const getGracePeriodType = (typeId: number): string => {
  switch (typeId) {
    case 1: return 'Parcial';
    case 2: return 'Total';
    case 3: return 'Sin gracia';
    default: return 'Parcial';
  }
};

interface BondCardProps {
  bond: BondResponse;
  onEdit(): void;
  onDelete(): void;
  deleting?: boolean;
}

export const BondCardComponent: React.FC<BondCardProps> = ({ bond, onEdit, onDelete, deleting }) => {
  const navigate = useNavigate();
  const currencySymbol = getCurrencyType(bond.currencyTypeId);
  const currencyCode = getCurrencyCode(bond.currencyTypeId);

  return (
    <div className="bg-(--background-color) text-(--text-color) rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold">📄 {bond.name}</h2>
          <p className="text-sm text-gray-500">ID: {bond.id}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-yellow-700 bg-yellow-100 rounded hover:bg-yellow-200 transition-colors"
          >
            ✏️ Editar
          </button>
          <button
            onClick={onDelete}
            disabled={deleting}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-700 bg-red-100 rounded hover:bg-red-200 transition-colors disabled:opacity-50"
          >
            {deleting ? '⏳' : '🗑️'} Eliminar
          </button>
          <button
            onClick={() => navigate(`/bond/${bond.id}/cash-flow`)}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200 transition-colors"
          >
            📊 Ver Flujo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6 text-sm">
        <Info label="💰 Valor Nominal" value={formatCurrency(bond.nominalValue, currencyCode)} />
        <Info label="💹 Valor de Mercado" value={formatCurrency(bond.marketValue, currencyCode)} />
        <Info label="💱 Moneda" value={`${currencySymbol} (${currencyCode})`} />
        <Info label="📆 Duración" value={`${bond.duration} años`} />
        <Info label="🔁 Frecuencia" value={`${bond.frequency} veces/año`} />
        <Info label="🏦 Tasa de Interés" value={`${formatPercentage(bond.interestRate)} (${getInterestRateType(bond.interestRateTypeId)})`} />
        <Info label="🗓️ Fecha de Emisión" value={formatDate(bond.emissionDate)} />
        {bond.gracePeriodTypeId !== 3 && (
          <Info label="⏳ Período de Gracia" value={`${bond.gracePeriodDuration} años (${getGracePeriodType(bond.gracePeriodTypeId)})`} />
        )}
        <Info label="📉 Tasa de Descuento" value={formatPercentage(bond.discountRate)} />
        {bond.capitalization > 0 && (
          <Info label="📈 Capitalización" value={`${bond.capitalization}`} />
        )}
        {bond.premiumRate > 0 && (
          <Info label="💼 Prima" value={formatPercentage(bond.premiumRate)} />
        )}
        {bond.structuredRate > 0 && (
          <Info label="🏗️ Tasa Estructurada" value={formatPercentage(bond.structuredRate)} />
        )}
        {bond.placementRate > 0 && (
          <Info label="🪙 Tasa de Colocación" value={formatPercentage(bond.placementRate)} />
        )}
        {bond.floatingRate > 0 && (
          <Info label="🌊 Tasa Flotante" value={formatPercentage(bond.floatingRate)} />
        )}
        {bond.cavaliRate > 0 && (
          <Info label="🧾 Tasa Cavali" value={formatPercentage(bond.cavaliRate)} />
        )}
        {bond.taxRate > 0 && (
          <Info label="💸 Tasa de Impuesto" value={formatPercentage(bond.taxRate)} />
        )}
        <Info label="📅 Días por Año" value={`${bond.daysPerYear}`} />
      </div>
    </div>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <span className="block font-medium">{label}:</span>
    <span>{value}</span>
  </div>
);
