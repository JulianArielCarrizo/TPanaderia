import { createSlice } from '@reduxjs/toolkit'; // Importa createSlice de Redux Toolkit

export const authSlice = createSlice({
    name: 'auth', // Nombre del slice de estado
    initialState: {
        status: 'checking',     // Estado inicial de autenticación ('checking', 'authenticated', 'not-authenticated')
        user: {},               // Datos del usuario autenticado
        errorMessage: undefined // Mensaje de error en caso de falla en la autenticación
    },
    reducers: {
        // Reducer para establecer el estado de "checking" al verificar la autenticación
        onChecking: (state) => {
            state.status = 'checking';      // Cambia el estado a 'checking'
            state.user = {};                // Reinicia los datos del usuario
            state.errorMessage = undefined; // Reinicia el mensaje de error
        },
        // Reducer para establecer el estado de "authenticated" al iniciar sesión exitosamente
        onLogin: (state, { payload }) => {
            state.status = 'authenticated'; // Cambia el estado a 'authenticated'
            state.user = payload;           // Actualiza los datos del usuario con los recibidos en payload
            state.errorMessage = undefined; // Reinicia el mensaje de error
        },
        // Reducer para establecer el estado de "not-authenticated" al cerrar sesión o fallar la autenticación
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated'; // Cambia el estado a 'not-authenticated'
            state.user = {};                    // Reinicia los datos del usuario
            state.errorMessage = payload;       // Establece el mensaje de error según el payload recibido
        },
        // Reducer para limpiar el mensaje de error
        clearErrorMessage: (state) => {
            state.errorMessage = undefined; // Reinicia el mensaje de error
        }
    }
});

// Action creators generados automáticamente por createSlice
export const {
    clearErrorMessage, // Acción para limpiar el mensaje de error
    onChecking,        // Acción para establecer el estado de "checking"
    onLogin,           // Acción para establecer el estado de "authenticated" al iniciar sesión
    onLogout           // Acción para establecer el estado de "not-authenticated" al cerrar sesión o fallar la autenticación
} = authSlice.actions; // Exporta todas las acciones generadas por createSlice