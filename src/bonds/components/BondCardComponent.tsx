import type { BondResponse } from "../model/response/bond.response";

// Función para formatear la fecha
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

// Función para formatear fecha para input
const formatDateForInput = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

// Función para formatear porcentajes
const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(2)}%`;
};

// Función para formatear moneda
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2
  }).format(value);
};

// Función para obtener el tipo de moneda
const getCurrencyType = (typeId: number): string => {
  switch (typeId) {
    case 1: return 'PEN';
    case 2: return 'USD';
    case 3: return 'EUR';
    default: return 'PEN';
  }
};

// Función para obtener el tipo de tasa de interés
const getInterestRateType = (typeId: number): string => {
  switch (typeId) {
    case 1: return 'Fija';
    case 2: return 'Variable';
    default: return 'Fija';
  }
};

// Función para obtener el tipo de período de gracia
const getGracePeriodType = (typeId: number): string => {
  switch (typeId) {
    case 1: return 'Parcial';
    case 2: return 'Total';
    default: return 'Parcial';
  }
};

interface BondCardProps {
  bond: BondResponse;
  onEdit(): void;
  onDelete(): void;
  deleting?: boolean;
}

export const BondCardComponent: React.FC<BondCardProps> = ({ bond, onEdit, onDelete, deleting }) => (
  <div className="bg-(--primary-color) text-(--text-color) rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
    {/* Header */}
    <div className="flex justify-between items-start mb-4">
      <div>
        <h2 className="text-2xl font-bold ">{bond.name}</h2>
        <p className="text-sm ">ID: {bond.id}</p>
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
      </div>
    </div>

    {/* Información del bono */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6 text-sm ">
      <Info label="Valor Nominal" value={formatCurrency(bond.nominalValue)} />
      <Info label="Valor de Mercado" value={formatCurrency(bond.marketValue)} />
      <Info label="Moneda" value={getCurrencyType(bond.currencyTypeId)} />
      <Info label="Duración" value={`${bond.duration} años`} />
      <Info label="Frecuencia" value={`${bond.frequency} veces/año`} />
      <Info label="Tasa de Interés" value={`${formatPercentage(bond.interestRate)} (${getInterestRateType(bond.interestRateTypeId)})`} />
      <Info label="Fecha de Emisión" value={formatDate(bond.emissionDate)} />
      <Info label="Período de Gracia" value={`${bond.gracePeriodDuration} años (${getGracePeriodType(bond.gracePeriodTypeId)})`} />
      <Info label="Tasa de Descuento" value={formatPercentage(bond.discountRate)} />
    </div>
  </div>
);

// Componente reutilizable para cada fila de información
const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <span className="block font-medium">{label}:</span>
    <span className="">{value}</span>
  </div>
);
