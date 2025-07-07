import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthenticationService } from '@/auth/services/authentication.service';
import type { AuthenticationState } from '@/auth/model/state/authentication.state';

const authenticationService = new AuthenticationService();

export const useAuthenticationStore = create<AuthenticationState>()(
  persist(
    (set) => ({
      isSignedIn: !!localStorage.getItem('token'),
      userId: 0,
      username: '',
      currentToken: () => localStorage.getItem('token'),
      signIn: async (request, navigate) => {
        try {
          const response = await authenticationService.signIn(request);
          set({
            isSignedIn: true,
            userId: response.id,
            username: response.username
          });
          console.log(useAuthenticationStore.getState());
          localStorage.setItem('token', response.token);
          navigate('/');
        } catch (err) {
          console.error('Error en signIn:', err);
          throw new Error('Correo o contraseña incorrectos');
        }
      },

      signUp: async (request, navigate) => {
        try {
          await authenticationService.signUp(request);
          set({ isSignedIn: false, userId: 0, username: '' });
          localStorage.removeItem('token');
          alert('Registro exitoso. Por favor, inicie sesión.');
          navigate('/sign-in');
        } catch (err) {
          console.error('Error en signUp:', err);
          alert('Error en el registro.');
          navigate('/sign-in');
        }
      },

      signOut: (navigate) => {
        set({ isSignedIn: false, userId: 0, username: '' });
        localStorage.removeItem('token');
        navigate('/sign-in');
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);
