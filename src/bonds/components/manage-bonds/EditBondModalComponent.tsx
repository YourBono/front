// src/bonds/components/EditBondModal.tsx
import { useState, useEffect } from 'react';
import type { UpdateBondRequest } from '../../model/request/update-bond.request';
import { BondService } from '@/bonds/services/bond.service';
import type { BondResponse } from '@/bonds/model/response/bond.response';

interface Props {
  open: boolean;
  bond: { id: number } | null;
  onCancel: () => void;
  onSave: (id: number, data: UpdateBondRequest) => void;
}

const bondService = new BondService();

export const EditBondModalComponent: React.FC<Props> = ({
  open,
  bond,
  onCancel,
  onSave,
}) => {
  const [form, setForm] = useState<UpdateBondRequest | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBond = async () => {
      if (!bond?.id) return;
      setLoading(true);
      try {
        const bondData: BondResponse = await bondService.getBondById(bond.id);
        setForm({
          name: bondData.name,
          nominalValue: bondData.nominalValue,
          marketValue: bondData.marketValue,
          duration: bondData.duration,
          frequency: bondData.frequency,
          interestRateTypeId: bondData.interestRateTypeId,
          interestRate: bondData.interestRate,
          capitalization: bondData.capitalization,
          discountRate: bondData.discountRate,
          taxRate: bondData.taxRate,
          emissionDate: bondData.emissionDate,
          gracePeriodTypeId: bondData.gracePeriodTypeId,
          gracePeriodDuration: bondData.gracePeriodDuration,
          currencyTypeId: bondData.currencyTypeId,
          premiumRate: bondData.premiumRate,
          structuredRate: bondData.structuredRate,
          placementRate: bondData.placementRate,
          floatingRate: bondData.floatingRate,
          cavaliRate: bondData.cavaliRate,
          daysPerYear: bondData.daysPerYear || parseInt(localStorage.getItem('daysPerYear') || '360'),
        });
      } catch (error) {
        console.error('Error al cargar el bono:', error);
      } finally {
        setLoading(false);
      }
    };

    if (open && bond) {
      fetchBond();
    }
  }, [open, bond]);

  const handleChange = (field: keyof UpdateBondRequest, value: any) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form && bond) onSave(bond.id, form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-(--secondary-color) bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-(--background-color) text-(--text-color) rounded-xl shadow-xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold mb-6 text-center">Editar Bono</h3>

        {loading || !form ? (
          <p className="text-center py-10 ">Cargando datos del bono...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Nombre" value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
              <Input type="number" label="Valor Nominal" value={form.nominalValue} onChange={(e) => handleChange('nominalValue', parseFloat(e.target.value))} />
              <Input type="number" label="Valor de Mercado" value={form.marketValue} onChange={(e) => handleChange('marketValue', parseFloat(e.target.value))} />
              <Input type="number" label="Duración (años)" value={form.duration} onChange={(e) => handleChange('duration', parseFloat(e.target.value))} />

              <Select label="Frecuencia de Pago" value={form.frequency} onChange={(e) => handleChange('frequency', parseInt(e.target.value))} options={getPeriodOptions()} />

              <Select label="Tipo de Tasa de Interés" value={form.interestRateTypeId} onChange={(e) => handleChange('interestRateTypeId', parseInt(e.target.value))} options={[{ label: 'Nominal', value: 1 }, { label: 'Efectiva', value: 2 }]} />
              <Input type="number" label="Tasa de Interés (%)" value={form.interestRate} onChange={(e) => handleChange('interestRate', parseFloat(e.target.value))} />
              <Select label="Capitalización" value={form.capitalization} onChange={(e) => handleChange('capitalization', parseInt(e.target.value))} options={getPeriodOptions()} disabled={form.interestRateTypeId === 2} />

              <Input type="number" label="Tasa de Descuento (%)" value={form.discountRate} onChange={(e) => handleChange('discountRate', parseFloat(e.target.value))} />
              <Input type="number" label="Impuesto a la Renta (%)" value={form.taxRate} onChange={(e) => handleChange('taxRate', parseFloat(e.target.value))} />
              <Input type="date" label="Fecha de Emisión" value={form.emissionDate} onChange={(e) => handleChange('emissionDate', e.target.value)} />

              <Select label="Tipo de Período de Gracia" value={form.gracePeriodTypeId} onChange={(e) => handleChange('gracePeriodTypeId', parseInt(e.target.value))} options={[{ label: 'Parcial', value: 1 }, { label: 'Total', value: 2 }, { label: 'Sin Período de Gracia', value: 3 }]} />
              <Input type="number" label="Duración del Período de Gracia" value={form.gracePeriodDuration} onChange={(e) => handleChange('gracePeriodDuration', parseInt(e.target.value))} disabled={form.gracePeriodTypeId === 3} />

              <Input type="number" label="Prima (%)" value={form.premiumRate} onChange={(e) => handleChange('premiumRate', parseFloat(e.target.value))} />
              <Input type="number" label="Estructuración (%)" value={form.structuredRate} onChange={(e) => handleChange('structuredRate', parseFloat(e.target.value))} />
              <Input type="number" label="Colocación (%)" value={form.placementRate} onChange={(e) => handleChange('placementRate', parseFloat(e.target.value))} />
              <Input type="number" label="Flotación (%)" value={form.floatingRate} onChange={(e) => handleChange('floatingRate', parseFloat(e.target.value))} />
              <Input type="number" label="CAVALI (%)" value={form.cavaliRate} onChange={(e) => handleChange('cavaliRate', parseFloat(e.target.value))} />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const Input = ({ label, type = 'text', value, onChange, disabled = false }: { label: string; type?: string; value: any; onChange: (e: any) => void; disabled?: boolean }) => (
  <label className="flex flex-col text-sm">
    {label}:
    <input
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="border rounded px-3 py-2 mt-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100"
      min={type === 'number' ? 0 : undefined}
    />
  </label>
);

const Select = ({ label, value, onChange, options, disabled = false }: { label: string; value: number; onChange: (e: any) => void; options: { label: string; value: number }[]; disabled?: boolean }) => (
  <label className="flex flex-col text-sm">
    {label}:
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="border rounded px-3 py-2 mt-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="text-black">
          {opt.label}
        </option>
      ))}
    </select>
  </label>
);

const getPeriodOptions = () => [
  { label: 'Diaria', value: parseInt(localStorage.getItem('daysPerYear') || '360') },
  { label: 'Semanal', value: 52 },
  { label: 'Quincenal', value: 24 },
  { label: 'Mensual', value: 12 },
  { label: 'Bimestral', value: 6 },
  { label: 'Trimestral', value: 4 },
  { label: 'Semestral', value: 2 },
  { label: 'Anual', value: 1 },
];
