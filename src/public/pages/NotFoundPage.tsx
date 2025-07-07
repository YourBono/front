import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de usar react-router-dom si estás en un SPA

export const NotFoundPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center h-[100dvh] bg-background text-(--text-color) px-4 text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Página no encontrada</h2>
      <p className="text-base mb-6">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <Link
        to="/home"
        className="px-6 py-2 rounded-lg bg-(--button-color) text-white hover:bg-primary/90 transition-colors"
      >
        Volver al Inicio
      </Link>
    </main>
  );
};
