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
            min={1}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Frecuencia de Pago</label>
          <select
            value={formData.frequency}
            onChange={(e) => handleChange('frequency', parseInt(e.target.value))}
            className={`w-full p-2 border rounded ${errors?.frequency ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option className='text-black' value={localStorage.getItem('daysPerYear') ? parseInt(localStorage.getItem('daysPerYear')!) : 360}>Diaria</option>
            <option className='text-black' value={52}>Semanal</option>
            <option className='text-black' value={24}>Quincenal</option>
            <option className='text-black' value={12}>Mensual</option>
            <option className='text-black' value={6}>Bimestral</option>
            <option className='text-black' value={4}>Trimestral</option>
            <option className='text-black' value={2}>Semestral</option>
            <option className='text-black' value={1}>Anual</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Tipo de Período de Gracia</label>
          <select
            value={formData.gracePeriodTypeId}
            onChange={(e) => handleChange('gracePeriodTypeId', parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option className="text-black" value={1}>Parcial</option>
            <option className="text-black" value={2}>Total</option>
            <option className="text-black" value={3}>Sin Período de Gracia</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Duración del Período de Gracia</label>
          <input
            type="number"
            value={formData.gracePeriodDuration}
            onChange={(e) => handleChange('gracePeriodDuration', parseInt(e.target.value) || 0)}
            className={`w-full p-2 border rounded ${
              errors?.gracePeriodDuration ? 'border-red-500' : 'border-gray-300'
            } ${formData.gracePeriodTypeId === 3 ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}`}
            min={formData.gracePeriodTypeId === 3 ? 0: 1}
            max={formData.duration * formData.frequency}
            disabled={formData.gracePeriodTypeId === 3} // Deshabilitar si no hay período de gracia
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Capitalización (veces por año)</label>
          <select
            value={formData.capitalization}
            onChange={(e) => handleChange('capitalization', parseInt(e.target.value) || 0)}
            className={`w-full p-2 border rounded ${errors?.frequency ? 'border-red-500' : 'border-gray-300'} ${
              formData.interestRateTypeId === 2 ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''
            }`}
            disabled={formData.interestRateTypeId === 2}
          >
            <option className='text-black' value={localStorage.getItem('daysPerYear') ? parseInt(localStorage.getItem('daysPerYear')!) : 360}>Diaria</option>
            <option className='text-black' value={52}>Semanal</option>
            <option className='text-black' value={24}>Quincenal</option>
            <option className='text-black' value={12}>Mensual</option>
            <option className='text-black' value={6}>Bimestral</option>
            <option className='text-black' value={4}>Trimestral</option>
            <option className='text-black' value={2}>Semestral</option>
            <option className='text-black' value={1}>Anual</option>
          </select>
        </div>
      </div>
    </div>
  );
};