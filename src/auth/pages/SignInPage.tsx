import React, { useState } from 'react';
import { AuthenticationInputFieldComponent } from '../components/AuthenticationInputFieldComponent';
import { useNavigate } from 'react-router-dom';
import { useAuthenticationStore } from '../services/authentication.store';
import type { SignInRequest } from '../model/request/sign-in.request';


export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuthenticationStore();
  
  const [signInRequest, setFormData] = useState<SignInRequest>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpiar errores cuando el usuario empiece a escribir
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!signInRequest.email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(signInRequest.email)) {
      newErrors.email = 'El formato del correo electrónico no es válido';
    }

    if (!signInRequest.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (signInRequest.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await signIn(signInRequest, navigate);
    } catch (error: any) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full h-[100dvh] px-4 sm:px-8 md:px-10 lg:px-16 py-4 flex flex-col justify-center items-center gap-2">
      <h1 className="text-(--title-color) font-bebas-neue text-center text-8xl">YOURBONO</h1>
      <form onSubmit={ handleSignIn } className="flex flex-col gap-4 w-full max-w-160 mx-auto mt-10">
        <AuthenticationInputFieldComponent
          value={signInRequest.email}
          placeholder="Correo electrónico"
          type="email"
          autocomplete="email"
          error={errors.email}
          onChange={(value) => handleChange('email', value)}
        />
        <AuthenticationInputFieldComponent
          value={signInRequest.password}
          placeholder="Contraseña"
          type="password"
          autocomplete="current-password"
          error={errors.password}
          onChange={(value) => handleChange('password', value)}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-(--button-color) text-white p-4 rounded-md hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>

        {errors.general && (
          <span className="text-red-400 text-sm text-center">{errors.general}</span>
        )}

        <p className="text-center text-base text-white">¿Aún no tienes una cuenta?</p>
        <div className="w-full h-0.5 bg-white" />
        <button
          type="button"
          className="bg-(--button-color) text-white p-4 rounded-md hover:cursor-pointer"
        >
          Regístrate
        </button>
      </form>
    </main>
  );
};