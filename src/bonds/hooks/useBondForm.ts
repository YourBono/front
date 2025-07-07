import { useState } from 'react';
import { BondService } from '../services/bond.service';
import type { BondRequest } from '../model/request/bond.request';

export const useBondForm = (userId: number) => {
  const bondService = new BondService();

  const [formData, setFormData] = useState<BondRequest>({
    userId,
    name: '',
    nominalValue: 1000,
    marketValue: 950,
    duration: 5,
    frequency: 2,
    interestRateTypeId: 1,
    interestRate: 8.0,
    capitalization: 2,
    discountRate: 7.0,
    emissionDate: new Date().toISOString().split('T')[0],
    gracePeriodTypeId: 1,
    gracePeriodDuration: 0,
    currencyTypeId: 1,
    primeRate: 3.0,
    structuredRate: 1.0,
    placementRate: 2.0,
    floatingRate: 0.5,
    cavaliRate: 0.25,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleChange = (field: keyof BondRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formatted = {
        ...formData,
        interestRate: formData.interestRate / 100,
        discountRate: formData.discountRate / 100,
        primeRate: formData.primeRate / 100,
        structuredRate: formData.structuredRate / 100,
        placementRate: formData.placementRate / 100,
        floatingRate: formData.floatingRate / 100,
        cavaliRate: formData.cavaliRate / 100,
        emissionDate: formData.emissionDate + 'T00:00:00.000Z',
      };

      await bondService.createBond(formatted);

      setSubmitMessage({ type: 'success', message: 'Bono creado exitosamente' });
      setFormData({ ...formData, name: '' });
    } catch (err: any) {
      setSubmitMessage({ type: 'error', message: err.message || 'Error desconocido' });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    submitMessage,
    setSubmitMessage,
    setFormData,
  };
};
