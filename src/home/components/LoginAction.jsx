import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginPage } from '../page/LoginPage'; // Ajusta la ruta según la ubicación de tu archivo LoginPage
import { useAuthStore } from '../../hooks';

export const LoginAction = () => {
  const { status, user, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return <h3>Verificando...</h3>;
  }

  if (status === 'authenticated' && user) {
    // Redirige a la página del cliente si está autenticado
    return <Navigate to="/userdashboard/productos" />;
  }

  // Renderiza la página de inicio de sesión
  return <LoginPage />;
};