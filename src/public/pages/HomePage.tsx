import React, { useEffect, useState } from 'react';
import { LayoutWithSidebar } from '../../shared/layouts/LayoutWithSidebar';
import { useAuthenticationStore } from '@/auth/services/authentication.store';

const PHRASES = [
  'Invertir con inteligencia es el primer paso al éxito.',
  '¡Tus bonos están más vivos que nunca!',
  'El futuro financiero se construye hoy.',
  'Gestionar es planear con precisión.',
  '¿Listo para optimizar tu portafolio?'
];

export const HomePage: React.FC = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [animatePhrase, setAnimatePhrase] = useState(true);
  const authenticationState = useAuthenticationStore.getState();
  const username = authenticationState.username || 'Usuario';

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatePhrase(false);
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        setAnimatePhrase(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <LayoutWithSidebar activeItem="home">
      <main className="flex flex-col items-center justify-center p-10 h-[100dvh] text-(--text-color) relative">
        <div className="max-w-4xl text-center animate-fade-in-up">
          <h1 className="text-6xl font-extrabold mb-10 text-(--title-color)">
            ¡Bienvenido de nuevo a YOURBONO!
          </h1>
          <h1 className="text-4xl font-extrabold mb-4 text-(--title-color)">
            ¿Qué te gustaría hacer hoy, <span className="text-(--name-color)"> { username }</span>?
          </h1>
          <p className="text-lg  mb-6">
            Gestiona y analiza tus <span className="text-blue-500 font-medium">bonos rotativos</span> con facilidad.
          </p>
          <p className={`text-xl text-(--name-color) font-semibold mb-8 min-h-[1.5rem] transition-opacity duration-500 ${animatePhrase ? 'opacity-100' : 'opacity-0'}`}>
            {PHRASES[phraseIndex]}
          </p>
          <div className="flex justify-center mb-8">
            <img
              src="/bono.webp"
              alt="Ilustración de bonos"
              className="w-72 h-auto drop-shadow-xl"
            />
          </div>
        </div>

        <div className="absolute bottom-10 text-sm text-gray-400 animate-pulse">
          Consejo: haz clic en "Añadir bono" para iniciar una nueva simulación.
        </div>
      </main>
    </LayoutWithSidebar>
  );
};
