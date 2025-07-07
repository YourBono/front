import React from 'react';
import type { BondRequest } from '@/bonds/model/request/bond.request';

interface Props {
  formData: BondRequest;
  errors?: Record<string, string>;
  handleChange: (field: keyof BondRequest, value: any) => void;
}

export const BondBasicInfoComponent: React.FC<Props> = ({ formData, handleChange, errors = {} }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Información Básica</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium mb-1">Nombre del Bono *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Bono Corporativo UPC 2025"
          />
          {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
        </div>

        <div>
          <label className="block font-medium mb-1">Fecha de Emisión *</label>
          <input
            type="date"
            value={formData.emissionDate}
            onChange={(e) => handleChange('emissionDate', e.target.value)}
            className="w-full p-2 border rounded border-gray-300"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Valor Nominal</label>
          <input
            type="number"
            value={formData.nominalValue}
            onChange={(e) => handleChange('nominalValue', parseFloat(e.target.value) || 0)}
            className="w-full p-2 border rounded border-gray-300"
            min={0}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Valor de Mercado</label>
          <input
            type="number"
            value={formData.marketValue}
            onChange={(e) => handleChange('marketValue', parseFloat(e.target.value) || 0)}
            className="w-full p-2 border rounded border-gray-300"
            min={0}
          />
        </div>
      </div>
    </div>
  );
};
