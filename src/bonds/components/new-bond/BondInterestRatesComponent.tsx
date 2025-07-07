import React from 'react';
import type { BondRequest } from '@/bonds/model/request/bond.request';

interface Props {
  formData: BondRequest;
  errors?: Record<string, string>;
  handleChange: (field: keyof BondRequest, value: any) => void;
}

export const BondInterestRatesComponent: React.FC<Props> = ({ formData, handleChange, errors = {} }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 ">Tasas de Interés</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium mb-1">Tipo de Tasa de Interés</label>
          <select
            value={formData.interestRateTypeId}
            onChange={(e) => handleChange('interestRateTypeId', parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded "
          >
            <option className="text-black" value={1}>Nominal</option>
            <option className="text-black" value={2}>Efectiva</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Tasa de Interés (%)</label>
          <input
            type="number"
            value={formData.interestRate}
            onChange={(e) => handleChange('interestRate', parseFloat(e.target.value) || 0)}
            className={`w-full p-2 border rounded ${errors?.interestRate ? 'border-red-500' : 'border-gray-300'}`}
            min={0}
            step="any"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Tasa anual de Descuento (%)</label>
          <input
            type="number"
            value={formData.discountRate}
            onChange={(e) => handleChange('discountRate', parseFloat(e.target.value) || 0)}
            className={`w-full p-2 border rounded ${errors?.discountRate ? 'border-red-500' : 'border-gray-300'}`}
            min={0}
            step="any"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Impuesto a la Renta (%)</label>
          <input
            type="number"
            value={formData.taxRate}
            onChange={(e) => handleChange('taxRate', parseFloat(e.target.value) || 0)}
            className={`w-full p-2 border rounded ${errors?.taxRate ? 'border-red-500' : 'border-gray-300'}`}
            min={0}
            step="any"
          />
        </div>
      </div>
    </div>
  );
};
