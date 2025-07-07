import { useAuthenticationStore } from './authentication.store';
import type { InternalAxiosRequestConfig } from 'axios';

/**
 * Authentication Interceptor
 *
 * Añade el header Authorization si el usuario está autenticado
 */
export const authenticationInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const authenticationState = useAuthenticationStore.getState()

  if (authenticationState.isSignedIn && authenticationState.currentToken()) {
    if (typeof config.headers === 'object') {
      config.headers['Authorization'] = `Bearer ${authenticationState.currentToken()}`;
    }
  }

  return config;
};