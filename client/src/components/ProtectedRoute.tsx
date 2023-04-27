import { useQuery } from 'react-query';
import { Navigate, Outlet } from 'react-router-dom';
import { getLoggedUserData } from '../api/auth';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = () => {
  const { setAdmin } = useAuth();
  const { isError } = useQuery(['admin'], () => getLoggedUserData(), {
    retry: false,
    onSuccess: (data) => {
      setAdmin(data);
    },
  });
  if (isError) {
    return <Navigate to="/auth" />;
  }

  return <Outlet />;
};
