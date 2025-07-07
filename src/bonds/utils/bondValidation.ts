import type { BondRequest } from '../model/request/bond.request';

export interface FormErrors {
  [key: string]: string;
}

export interface ValidationWarning {
  field: keyof BondRequest;
  message: string;
}

export function validateBondForm(formData: BondRequest): { isValid: boolean; errors: FormErrors } {
  const errors: FormErrors = {};

  if (!formData.name.trim()) {
    errors.name = 'El nombre del bono es obligatorio';
  }
  if (formData.nominalValue <= 0) {
    errors.nominalValue = 'El valor nominal debe ser mayor a 0';
  }
  if (formData.marketValue <= 0) {
    errors.marketValue = 'El valor de mercado debe ser mayor a 0';
  }
  if (formData.duration <= 0) {
    errors.duration = 'La duración debe ser mayor a 0';
  }
  if (formData.frequency <= 0) {
    errors.frequency = 'La frecuencia debe ser mayor a 0';
  }
  if (formData.interestRate <= 0) {
    errors.interestRate = 'La tasa de interés debe ser mayor a 0';
  }
  if (!formData.emissionDate) {
    errors.emissionDate = 'La fecha de emisión es obligatoria';
  }

  // Límites para prevenir errores
  if (formData.nominalValue > 1_000_000_000) {
    errors.nominalValue = 'El valor nominal no puede ser mayor a 1,000,000,000';
  }
  if (formData.marketValue > 1_000_000_000) {
    errors.marketValue = 'El valor de mercado no puede ser mayor a 1,000,000,000';
  }
  if (formData.duration > 100) {
    errors.duration = 'La duración no puede ser mayor a 100 años';
  }
  if (formData.frequency > 365) {
    errors.frequency = 'La frecuencia no puede ser mayor a 365 veces por año';
  }
  if (formData.interestRate > 100) {
    errors.interestRate = 'La tasa de interés no puede ser mayor al 100%';
  }
  if (formData.capitalization > 365) {
    errors.capitalization = 'La capitalización no puede ser mayor a 365 veces por año';
  }

  // Tasas negativas
  const rateFields: (keyof BondRequest)[] = [
    'discountRate', 'premiumRate', 'structuredRate', 'placementRate', 'floatingRate', 'cavaliRate',
  ];
  for (const field of rateFields) {
    if (formData[field] as number < 0) {
      errors[field] = 'Esta tasa no puede ser negativa';
    }
  }

  // Validación de fecha futura
  const emissionDate = new Date(formData.emissionDate);
  const today = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(today.getFullYear() + 10);
  if (emissionDate > maxDate) {
    errors.emissionDate = 'La fecha de emisión no puede ser mayor a 10 años en el futuro';
  }

  // Período de gracia inválido
  if (formData.gracePeriodDuration < 0) {
    errors.gracePeriodDuration = 'La duración del período de gracia no puede ser negativa';
  }
  if (formData.gracePeriodDuration > formData.duration) {
    errors.gracePeriodDuration = 'El período de gracia no puede ser mayor a la duración total';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateBondBusinessLogic(formData: BondRequest): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];

  // Relación valor mercado / nominal
  const ratio = formData.marketValue / formData.nominalValue;
  if (ratio < 0.5 || ratio > 1.5) {
    warnings.push({
      field: 'marketValue',
      message: `El valor de mercado (${formData.marketValue}) es muy diferente del nominal (${formData.nominalValue}).`,
    });
  }

  // Tasas muy altas o bajas
  if (formData.interestRate > 50) {
    warnings.push({ field: 'interestRate', message: 'La tasa de interés es muy alta (>50%).' });
  }
  if (formData.interestRate < 0.01) {
    warnings.push({ field: 'interestRate', message: 'La tasa de interés es muy baja (<0.01%).' });
  }

  // Capitalización desproporcionada
  if (formData.capitalization > formData.frequency * 4) {
    warnings.push({
      field: 'capitalization',
      message: 'La capitalización es muy alta comparada con la frecuencia de pago.',
    });
  }

  // Período de gracia inválido
  if (formData.gracePeriodDuration >= formData.duration) {
    warnings.push({
      field: 'gracePeriodDuration',
      message: 'El período de gracia no puede ser mayor o igual a la duración.',
    });
  }

  // Descuento mayor a interés
  if (formData.discountRate > formData.interestRate) {
    warnings.push({
      field: 'discountRate',
      message: 'La tasa de descuento es mayor que la tasa de interés.',
    });
  }

  // Tasas adicionales vs interés
  const totalExtraRates = formData.premiumRate + formData.structuredRate + formData.placementRate +
    formData.floatingRate + formData.cavaliRate;
  if (totalExtraRates > formData.interestRate) {
    warnings.push({
      field: 'premiumRate',
      message: `La suma de tasas adicionales (${totalExtraRates.toFixed(2)}%) es mayor que la tasa de interés.`,
    });
  }

  // Duración demasiado larga
  if (formData.duration > 50) {
    warnings.push({
      field: 'duration',
      message: 'La duración es muy larga (>50 años). Esto puede causar problemas numéricos.',
    });
  }

  return warnings;
}
