import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import '../../index.css';
import { NavbarPub } from '../components/NavBarPub';
import styles from './LoginPage.module.css';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';

// Definición de los campos del formulario de inicio de sesión
const loginFormFields = {
    loginEmail: '',         // Campo para el correo electrónico de inicio de sesión
    loginPassword: '',      // Campo para la contraseña de inicio de sesión
};

// Componente funcional LoginPage
export const LoginPage = () => {
    // Obtiene funciones y estado relacionados con la autenticación desde el hook useAuthStore
    const { startLogin, errorMessage } = useAuthStore();

    // Obtiene estado y funciones para el manejo del formulario desde useForm
    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);

    // Función para manejar el envío del formulario de inicio de sesión
    const loginSubmit = (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario
        startLogin({ email: loginEmail, password: loginPassword }); // Inicia el proceso de inicio de sesión con los datos actuales
    };

    // Efecto que se ejecuta cuando errorMessage cambia
    useEffect(() => {
        if (errorMessage !== undefined) {
            // Muestra un mensaje de error utilizando la librería SweetAlert2
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
    }, [errorMessage]); // Dependencia: se ejecuta cuando errorMessage cambia

    return (
        <>
            <NavbarPub />
            <h1>Ingresa a nuestra tienda</h1>
            <div className={styles.pageContainer}>
                <div className={styles.content}>
                    <form className={styles.contactForm} onSubmit={loginSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="loginEmail" className={styles.label}>Correo</label>
                            <input
                                type="text"
                                id="loginEmail"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={onLoginInputChange}
                                className={styles.input}
                                placeholder="Correo"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="loginPassword" className={styles.label}>Contraseña</label>
                            <input
                                type="password"
                                id="loginPassword"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={onLoginInputChange}
                                className={styles.input}
                                placeholder="Contraseña"
                            />
                        </div>
                        <button type="submit" className={styles.submitBtn}>Login</button>
                    </form>
                    <div className={styles.registerPrompt}>
                        <p>No tienes cuenta? <Link to="/register" className={styles.registerLink}>Registrate</Link></p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};