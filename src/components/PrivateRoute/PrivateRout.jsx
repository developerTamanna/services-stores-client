// PrivateRoute.jsx
import { Navigate, useLocation } from 'react-router';


import Loader from '../../pages/Loader';
import { use } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loader></Loader>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
