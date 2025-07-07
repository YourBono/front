import React from 'react';
import type { BondRequest } from '@/bonds/model/request/bond.request';

interface Props {
  formData: BondRequest;
  errors?: Record<string, string>;
  handleChange: (field: keyof BondRequest, value: any) => void;
}

export const BondPeriodsComponent: React.FC<Props> = ({ formData, handleChange, errors = {} }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Configuración de Períodos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium mb-1">Duración (años)</label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => handleChange('duration', parseInt(e.target.value) || 0)}
            className={`w-full p-2 border rounded ${errors?.duration ? 'border-red-500' : 'border-gray-300'}`}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Frecuencia de Pago (veces por año)</label>
          <input
            type="number"
            value={formData.frequency}
            onChange={(e) => handleChange('frequency', parseInt(e.target.value) || 0)}
            className={`w-full p-2 border rounded ${errors?.frequency ? 'border-red-500' : 'border-gray-300'}`}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Tipo de Período de Gracia</label>
          <select
            value={formData.gracePeriodTypeId}
            onChange={(e) => handleChange('gracePeriodTypeId', parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value={1}>Parcial</option>
            <option value={2}>Total</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Duración del Período de Gracia</label>
          <input
            type="number"
            value={formData.gracePeriodDuration}
            onChange={(e) => handleChange('gracePeriodDuration', parseInt(e.target.value) || 0)}
            className={`w-full p-2 border rounded ${errors?.gracePeriodDuration ? 'border-red-500' : 'border-gray-300'}`}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Capitalización (veces por año)</label>
          <input
            type="number"
            value={formData.capitalization}
            onChange={(e) => handleChange('capitalization', parseInt(e.target.value) || 0)}
            className={`w-full p-2 border rounded ${errors?.capitalization ? 'border-red-500' : 'border-gray-300'}`}
          />
        </div>
      </div>
    </div>
  );
};