import { useQuery } from 'react-query';
import { Navigate, Outlet } from 'react-router-dom';
import { getLoggedUserData } from '../api/auth';
import { useAuth } from '../hooks/useAuth';
import { getToken } from '../utils/tokenStorage';

export const ProtectedRoute = () => {
  const { setAdmin } = useAuth();
  const { isError } = useQuery(
    ['admin', getToken()],
    () => getLoggedUserData(getToken()),
    {
      retry: false,
      onSuccess: (data) => {
        console.log(data);
        setAdmin(data);
      },
    }
  );
  if (isError) {
    return <Navigate to="/auth" />;
  }

  return <Outlet />;
};
