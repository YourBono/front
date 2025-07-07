// src/bonds/components/EditBondModal.tsx
import { useState, useEffect } from 'react';
import type { UpdateBondRequest } from '../model/request/update-bond.request';

interface Props {
  open: boolean;
  bond: UpdateBondRequest & { id: number } | null; 
  onCancel: () => void;
  onSave: (id: number, data: UpdateBondRequest) => void;
}

export const EditBondModalComponent: React.FC<Props> = ({
  open,
  bond,
  onCancel,
  onSave
}) => {
  const [form, setForm] = useState<UpdateBondRequest | null>(null);

  useEffect(() => {
    if (bond) setForm({ ...bond });
  }, [bond]);

  const handleChange = (field: keyof UpdateBondRequest, value: any) => {
    setForm((prev) => prev ? { ...prev, [field]: value } : prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form) onSave(bond!.id, form);
  };

  if (!open || !form) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Editar Bono</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col text-sm">
              Nombre:
              <input
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="border rounded px-2 py-1"
              />
            </label>

            <label className="flex flex-col text-sm">
              Valor Nominal:
              <input
                type="number"
                value={form.nominalValue}
                onChange={(e) => handleChange('nominalValue', parseFloat(e.target.value))}
                className="border rounded px-2 py-1"
              />
            </label>

            <label className="flex flex-col text-sm">
              Valor de Mercado:
              <input
                type="number"
                value={form.marketValue}
                onChange={(e) => handleChange('marketValue', parseFloat(e.target.value))}
                className="border rounded px-2 py-1"
              />
            </label>

            <label className="flex flex-col text-sm">
              Duración:
              <input
                type="number"
                value={form.duration}
                onChange={(e) => handleChange('duration', parseInt(e.target.value))}
                className="border rounded px-2 py-1"
              />
            </label>

            <label className="flex flex-col text-sm">
              Frecuencia:
              <input
                type="number"
                value={form.frequency}
                onChange={(e) => handleChange('frequency', parseInt(e.target.value))}
                className="border rounded px-2 py-1"
              />
            </label>

            <label className="flex flex-col text-sm">
              Tipo de Tasa de Interés:
              <input
                type="number"
                value={form.interestRateTypeId}
                onChange={(e) => handleChange('interestRateTypeId', parseInt(e.target.value))}
                className="border rounded px-2 py-1"
              />
            </label>

            <label className="flex flex-col text-sm">
              Tasa de Interés:
              <input
                type="number"
                value={form.interestRate}
                onChange={(e) => handleChange('interestRate', parseFloat(e.target.value))}
                className="border rounded px-2 py-1"
              />
            </label>

            <label className="flex flex-col text-sm">
              Capitalización:
              <input
                type="number"
                value={form.capitalization}
                onChange={(e) => handleChange('capitalization', parseInt(e.target.value))}
                className="border rounded px-2 py-1"
              />
            </label>

            <label className="flex flex-col text-sm">
              Tasa de Descuento:
              <input
                type="number"
                value={form.discountRate}
                onChange={(e) => handleChange('discountRate', parseFloat(e.target.value))}
                className="border rounded px-2 py-1"
              />
            </label>

            <label className="flex flex-col text-sm">
              Fecha de Emisión:
              <input
                type="date"
                value={form.emissionDate}
                onChange={(e) => handleChange('emissionDate', e.target.value)}
                className="border rounded px-2 py-1"
              />
            </label>

            <label className="flex flex-col text-sm">
              Tipo de Período de Gracia:
              <input
                type="number"
                value={form.gracePeriodTypeId}
                onChange={(e) => handleChange('gracePeriodTypeId', parseInt(e.target.value))}
                className="border rounded px-2 py-1"
              />
            </label>

            <label className="flex flex-col text-sm">
              Duración del Período de Gracia:
              <input
                type="number"
                value={form.gracePeriodDuration}
                onChange={(e) => handleChange('gracePeriodDuration', parseInt(e.target.value))}
                className="border rounded px-2 py-1"
              />
            </label>

            <label className="flex flex-col text-sm">
              Tipo de Moneda:
              <input
                type="number"
                value={form.currencyTypeId}
                onChange={(e) => handleChange('currencyTypeId', parseInt(e.target.value))}
                className="border rounded px-2 py-1"
              />
            </label>

            <label className="flex flex-col text-sm">
              Prime Rate:
              <input
                type="number"
                value={form.primeRate}
                onChange={(e) => handleChange('primeRate', parseFloat(e.target.value))}
                className="border rounded px-2 py-1"
              />
            </label>

            <label className="flex flex-col text-sm">
              Structured Rate:
              <input
                type="number"
                value={form.structuredRate}
                onChange={(e) => handleChange('structuredRate', parseFloat(e.target.value))}
                className="border rounded px-2 py-1"
              />
            </label>

            <label className="flex flex-col text-sm">
              Placement Rate:
              <input
                type="number"
                value={form.placementRate}
                onChange={(e) => handleChange('placementRate', parseFloat(e.target.value))}
                className="border rounded px-2 py-1"
              />
            </label>

            <label className="flex flex-col text-sm">
              Floating Rate:
              <input
                type="number"
                value={form.floatingRate}
                onChange={(e) => handleChange('floatingRate', parseFloat(e.target.value))}
                className="border rounded px-2 py-1"
              />
            </label>

            <label className="flex flex-col text-sm">
              Cavali Rate:
              <input
                type="number"
                value={form.cavaliRate}
                onChange={(e) => handleChange('cavaliRate', parseFloat(e.target.value))}
                className="border rounded px-2 py-1"
              />
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
