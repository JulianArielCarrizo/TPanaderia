import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../hooks';
import { AdminLoginPage } from '../pages/AdminLoginPage';

export const AdminLoginAction = () => {
  const { status, user, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return <h3>Verificando...</h3>;
  }

  if (status === 'authenticated' && user.name === 'admin') {
    return <Navigate to="/admindashboard/crud/" />;
  } else {
    return <AdminLoginPage />;
  }
};