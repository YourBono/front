import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { authenticationInterceptor } from '@/auth/services/authentication.interceptor';

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5272/api/v1';

/**
 * Axios instance
 * @summary http axios instance with default configuration
 *
 * @type {AxiosInstance}
 */
const http: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Set default headers
http.defaults.headers.common['Content-Type'] = 'application/json';
http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// Add authentication interceptor
http.interceptors.request.use(authenticationInterceptor);

export default http;
