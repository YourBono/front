import React from 'react';
import type { BondRequest } from '@/bonds/model/request/bond.request';

interface Props {
  formData: BondRequest;
  errors?: Record<string, string>;
  handleChange: (field: keyof BondRequest, value: any) => void;
}

export const BondAdditionalRatesComponent: React.FC<Props> = ({ formData, handleChange, errors = {} }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 ">Tasas Adicionales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: 'Prima (%)', key: 'premiumRate' },
          { label: 'Estructuración (%)', key: 'structuredRate' },
          { label: 'Colocación (%)', key: 'placementRate' },
          { label: 'Flotación (%)', key: 'floatingRate' },
          { label: 'CAVALI (%)', key: 'cavaliRate' },
        ].map(({ label, key }) => (
          <div key={key}>
            <label className="block font-medium mb-1">{label}</label>
            <input
              type="number"
              value={formData[key as keyof BondRequest]}
              onChange={(e) => handleChange(key as keyof BondRequest, parseFloat(e.target.value) || 0)}
              className={`w-full p-2 border rounded ${
                errors?.[key] ? 'border-red-500' : 'border-gray-300'
              }`}
              min={0}
              step="any"
            />
            {errors?.[key] && <span className="text-sm text-red-500">{errors[key]}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};
