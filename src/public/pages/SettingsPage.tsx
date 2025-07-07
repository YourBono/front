import React, { useEffect, useState } from "react";
import LayoutWithSidebar from "@/shared/layouts/LayoutWithSidebar";

export const SettingsPage: React.FC = () => {
  const [currencyTypeId, setCurrencyTypeId] = useState<number>(1);
  const [daysPerYear, setDaysPerYear] = useState<number>(360);

  // Cargar configuración al iniciar
  useEffect(() => {
    const savedCurrency = localStorage.getItem("currencyTypeId");
    const savedDays = localStorage.getItem("daysPerYear");

    if (savedCurrency) setCurrencyTypeId(parseInt(savedCurrency));
    if (savedDays) setDaysPerYear(parseInt(savedDays));
  }, []);

  // Guardar automáticamente al cambiar
  useEffect(() => {
    localStorage.setItem("currencyTypeId", currencyTypeId.toString());
  }, [currencyTypeId]);

  useEffect(() => {
    localStorage.setItem("daysPerYear", daysPerYear.toString());
  }, [daysPerYear]);

  return (
    <LayoutWithSidebar activeItem="settings">
      <main className="flex flex-col items-center justify-center p-10 bg-(--background-color) text-(--text-color) h-[100dvh]">
        <h1 className="text-4xl font-bold mb-6">Configuración</h1>
        <p className="text-lg mb-8">Ajusta tus preferencias</p>

        <div className="w-full max-w-md flex flex-col gap-6">
          {/* Selector de moneda */}
          <div>
            <label className="block text-lg font-medium mb-1">Tipo de Moneda</label>
            <select
              value={currencyTypeId}
              onChange={(e) => setCurrencyTypeId(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option className="text-black" value={1}>Soles (PEN)</option>
              <option className="text-black" value={2}>Dólares (USD)</option>
              <option className="text-black" value={3}>Euros (EUR)</option>
            </select>
          </div>

          {/* Selector de días por año */}
          <div>
            <label className="block text-lg font-medium mb-1">Días por Año</label>
            <select
              value={daysPerYear}
              onChange={(e) => setDaysPerYear(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option className="text-black" value={360}>360 días</option>
              <option className="text-black" value={365}>365 días</option>
            </select>
          </div>
        </div>
      </main>
    </LayoutWithSidebar>
  );
};
