import React from 'react';
import { Navigate } from 'react-router-dom'; 
import { useAuthStore } from '../../hooks'; 

export const ProtectedRoute = ({ element, redirectTo }) => {
    const { user, status } = useAuthStore(); // Extrae user y status del hook useAuthStore()

    // Verifica si el usuario está autenticado y el estado es 'authenticated'
    if (user && status === 'authenticated') {
        return element; // Renderiza el elemento recibido si el usuario está autenticado
    } else {
        return <Navigate to={redirectTo} />; // Redirige a la ruta especificada en redirectTo si no está autenticado
    }
};