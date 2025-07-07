import React, { useState } from 'react';
import { LayoutWithSidebar } from '../../shared/layouts/LayoutWithSidebar';
import { useAuthenticationStore } from '@/auth/services/authentication.store';
import { useBondForm } from '@/bonds/hooks/useBondForm';
import { FormMessageBox } from '@/shared/components/FormMessageBox';
import { BondBasicInfoComponent } from '@/bonds/components/new-bond/BondBasicInfoComponent';
import { BondPeriodsComponent } from '../components/new-bond/BondPeriodsComponent';
import { BondInterestRatesComponent } from '../components/new-bond/BondInterestRatesComponent';
import { BondAdditionalRatesComponent } from '../components/new-bond/BondAdditionalRatesComponent';
import { validateBondForm } from '@/bonds/utils/bondValidation'; // asegúrate que el path sea correcto
import type { FormErrors } from '@/bonds/utils/bondValidation';

export const NewBondPage: React.FC = () => {
  const userId = useAuthenticationStore.getState().userId;
  const {
    formData,
    handleChange,
    handleSubmit: baseHandleSubmit,
    isLoading,
    submitMessage,
    setSubmitMessage,
  } = useBondForm(userId);

  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmitWithValidation = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateBondForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      setSubmitMessage(null);
      return;
    }

    setErrors({});
    await baseHandleSubmit(e);
  };

  return (
    <LayoutWithSidebar activeItem="new-bond">
      <main className="p-10">
        <form onSubmit={handleSubmitWithValidation} className="max-w-5xl mx-auto bg-(--background-color) text-(--text-color) p-8 rounded shadow-md border-4 border-(--primary-color)">
          <h1 className="text-3xl font-bold mb-6">Nuevo Bono Corporativo</h1>

          <BondBasicInfoComponent
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
          <BondPeriodsComponent
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
          <BondInterestRatesComponent
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
          <BondAdditionalRatesComponent
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />

          <div className="flex justify-end my-6">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isLoading ? 'Creando...' : 'Crear Bono'}
            </button>
          </div>

          {submitMessage && (
            <FormMessageBox type={submitMessage.type} message={submitMessage.message} />
          )}
        </form>
      </main>
    </LayoutWithSidebar>
  );
};