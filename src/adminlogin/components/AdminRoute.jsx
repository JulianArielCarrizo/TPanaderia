import React from 'react';
import { Navigate } from 'react-router-dom'; 
import { useAuthStore } from '../../hooks'; 

export const AdminRoute = ({ element, redirectTo }) => {
    const { user, status } = useAuthStore(); // Extrae user y status del hook useAuthStore()

    // Verifica si el usuario es 'admin' y está autenticado
    if (user?.name === 'admin' && status === 'authenticated') {
        return element; // Renderiza el elemento recibido si el usuario es 'admin' y está autenticado
    } else {
        return <Navigate to={redirectTo} />; // Redirige a la ruta especificada en redirectTo si no cumple con las condiciones
    }
};