import { useDispatch, useSelector } from 'react-redux'; // Importa funciones de react-redux para el manejo del estado global
import { panaderiaApi } from '../api'; // Importa la instancia de la API personalizada
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store'; // Importa acciones de Redux


export const useAuthStore = () => {
    // Obtiene el estado de autenticación del store global utilizando useSelector
    const { status, user, errorMessage } = useSelector(state => state.auth);
    
    // Obtiene la función dispatch del store global para despachar acciones de Redux
    const dispatch = useDispatch();

    // Función para iniciar sesión de usuario normal
    const startLogin = async ({ email, password }) => {
        dispatch(onChecking()); // Activa el estado de "checking" mientras se realiza la autenticación
        try {
            const { data } = await panaderiaApi.post('/auth/', { email, password }); // Llama a la API para iniciar sesión
            
            // Almacena el token de sesión y la fecha de inicio en el localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            // Despacha la acción para actualizar el estado global con los datos del usuario autenticado
            dispatch(onLogin({ name: data.name, uid: data.uid }));
            
        } catch (error) {
            // En caso de error al iniciar sesión, despacha la acción para cerrar la sesión y muestra el mensaje de error
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage()); // Limpia el mensaje de error después de un breve periodo
            }, 10);
        }
    };

    // Función para iniciar sesión de administrador
    const startAdminLogin = async ({ name, password }) => {
        dispatch(onChecking()); // Activa el estado de "checking" mientras se realiza la autenticación
        try {
            const { data } = await panaderiaApi.post('/auth/admin', { name, password }); // Llama a la API para iniciar sesión como administrador
            
            // Almacena el token de sesión y la fecha de inicio en el localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            // Despacha la acción para actualizar el estado global con los datos del administrador autenticado
            dispatch(onLogin({ name: data.name, uid: data.uid }));
            
        } catch (error) {
            // En caso de error al iniciar sesión, despacha la acción para cerrar la sesión y muestra el mensaje de error
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage()); // Limpia el mensaje de error después de un breve periodo
            }, 10);
        }
    };

    // Función para registrar un nuevo usuario
    const startRegister = async ({ email, password, name }) => {
        dispatch(onChecking()); // Activa el estado de "checking" mientras se realiza el registro
        try {
            const { data } = await panaderiaApi.post('/auth/new', { email, password, name }); // Llama a la API para registrar un nuevo usuario
            
            // Almacena el token de sesión y la fecha de inicio en el localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            // Despacha la acción para actualizar el estado global con los datos del usuario registrado
            dispatch(onLogin({ name: data.name, uid: data.uid }));
            
        } catch (error) {
            // En caso de error al registrar, despacha la acción para cerrar la sesión con el mensaje de error correspondiente
            dispatch(onLogout(error.response.data?.msg || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage()); // Limpia el mensaje de error después de un breve periodo
            }, 10);
        }
    };

    // Función para verificar el token de autenticación almacenado en el localStorage
    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout()); // Si no hay token, cierra la sesión

        try {
            const { data } = await panaderiaApi.get('auth/renew'); // Llama a la API para renovar el token
            
            // Almacena el nuevo token de sesión y la fecha de inicio en el localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            // Despacha la acción para actualizar el estado global con los datos del usuario autenticado
            dispatch(onLogin({ name: data.name, uid: data.uid }));
            
        } catch (error) {
            localStorage.clear(); // Borra el localStorage en caso de error
            dispatch(onLogout()); // Cierra la sesión
        }
    };

    // Función para cerrar sesión
    const startLogout = () => {
        localStorage.clear(); // Borra todos los datos del localStorage
        dispatch(onLogout()); // Despacha la acción para cerrar la sesión
        window.location.href = "/login"; // Redirige a la página de inicio de sesión
    };

    // Retorna un objeto con propiedades (estado y datos del usuario) y métodos (funciones para iniciar sesión, registrar, verificar token y cerrar sesión)
    return {
        //propiedades
        errorMessage,       
        status,             
        user,   
        
        //Métodos
        checkAuthToken,     
        startLogin,         
        startAdminLogin,    
        startLogout,        
        startRegister       
    };
};