import React, { useState } from 'react';
import { AuthenticationInputFieldComponent } from '../components/AuthenticationInputFieldComponent';
import { useNavigate } from 'react-router-dom';
import { useAuthenticationStore } from '../services/authentication.store';
import type { SignUpRequest } from '../model/request/sign-up.request';

export const SignUpPage: React.FC = () => {
    const navigate = useNavigate();
    const { signUp } = useAuthenticationStore();

    const [signUpRequest, setFormData] = useState<SignUpRequest>({
        username: '',
        email: '',
        password: '',
    });

    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState<{
        username?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
        general?: string;
    }>({});

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (field: string, value: string) => {
        if (field === 'confirmPassword') {
            setConfirmPassword(value);
        } else {
            setFormData((prev) => ({ ...prev, [field]: value }));
        }

        // Limpiar errores cuando el usuario empiece a escribir
        if (errors[field as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: typeof errors = {};

        if (!signUpRequest.username) {
            newErrors.username = 'El nombre de usuario es obligatorio';
        } else if (signUpRequest.username.length < 3) {
            newErrors.username = 'El nombre de usuario debe tener al menos 3 caracteres';
        }

        if (!signUpRequest.email) {
            newErrors.email = 'El correo electrónico es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(signUpRequest.email)) {
            newErrors.email = 'El formato del correo electrónico no es válido';
        }

        if (!signUpRequest.password) {
            newErrors.password = 'La contraseña es obligatoria';
        } else if (signUpRequest.password.length < 8) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(signUpRequest.password)) {
            newErrors.password = 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&)';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Confirma tu contraseña';
        } else if (signUpRequest.password !== confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            await signUp(signUpRequest, navigate);
        } catch (error: any) {
            setErrors({ general: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoToSignIn = () => {
        navigate('/sign-in');
    };

    return (
        <main className="w-full h-[100dvh] px-4 sm:px-8 md:px-10 lg:px-16 py-4 flex flex-col justify-center items-center gap-2">
            <h1 className="text-(--title-color) font-bebas-neue text-center text-8xl">YOURBONO</h1>
            <form onSubmit={handleSignUp} className="flex flex-col gap-4 w-full max-w-160 mx-auto mt-10">
                <AuthenticationInputFieldComponent
                    value={signUpRequest.username}
                    placeholder="Nombre de usuario"
                    type="text"
                    autocomplete="username"
                    error={errors.username}
                    onChange={(value) => handleChange('username', value)}
                />
                <AuthenticationInputFieldComponent
                    value={signUpRequest.email}
                    placeholder="Correo electrónico"
                    type="email"
                    autocomplete="email"
                    error={errors.email}
                    onChange={(value) => handleChange('email', value)}
                />
                <AuthenticationInputFieldComponent
                    value={signUpRequest.password}
                    placeholder="Contraseña"
                    type="password"
                    autocomplete="new-password"
                    error={errors.password}
                    onChange={(value) => handleChange('password', value)}
                />
                <AuthenticationInputFieldComponent
                    value={confirmPassword}
                    placeholder="Confirmar contraseña"
                    type="password"
                    autocomplete="new-password"
                    error={errors.confirmPassword}
                    onChange={(value) => handleChange('confirmPassword', value)}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-(--button-color) text-white p-4 rounded-md hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Registrando...' : 'Regístrate'}
                </button>

                {errors.general && (
                    <span className="text-red-400 text-sm text-center">{errors.general}</span>
                )}

                <p className="text-center text-base text-white">¿Ya tienes una cuenta?</p>
                <div className="w-full h-0.5 bg-white" />
                <button
                    type="button"
                    onClick={handleGoToSignIn}
                    className="bg-(--button-color) text-white p-4 rounded-md hover:cursor-pointer"
                >
                    Iniciar sesión
                </button>
            </form>
        </main>
    );
};