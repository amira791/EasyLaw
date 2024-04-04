import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './LogoProvider';

const ProtectedRoute = () => {
  const { isAuth } = useContext(AuthContext);

  if (!isAuth) {
    // Rediriger l'utilisateur vers la page de connexion s'il n'est pas authentifié
    return <Navigate to="/signin" replace />;
  }

  // Sinon, rendre le composant demandé
  return <Outlet />;
};

export default ProtectedRoute;