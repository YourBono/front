import { useAuthenticationStore } from '@/auth/services/authentication.store';
import { Navigate, Outlet } from 'react-router-dom';

export const RequireAuthentication = () => {
  const { isSignedIn } = useAuthenticationStore();
  return isSignedIn ? <Outlet /> : <Navigate to="/sign-in" replace />;
};