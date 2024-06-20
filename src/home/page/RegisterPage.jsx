import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import { NavbarPub } from '../components/NavBarPub';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import styles from './RegisterPage.module.css';

// Definición de los campos del formulario de registro
const registerFormFields = {
    registerName: '',           // Campo para el nombre de usuario en el registro
    registerEmail: '',          // Campo para el correo electrónico en el registro
    registerPassword: '',       // Campo para la contraseña en el registro
    registerPassword2: '',      // Campo para confirmar la contraseña en el registro
};

// Componente funcional RegisterPage
export const RegisterPage = () => {
    // Obtiene funciones y estado relacionados con la autenticación desde el hook useAuthStore
    const { errorMessage, startRegister } = useAuthStore();

    // Obtiene estado y funciones para el manejo del formulario desde useForm
    const { registerEmail, registerName, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerFormFields);

    // Función para manejar el envío del formulario de registro
    const registerSubmit = async (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario

        // Validación: No se permite usar 'admin' como nombre de usuario
        if (registerName.toLowerCase() === 'admin') {
            Swal.fire('Error en registro', 'No se puede usar "admin" como usuario', 'error');
            return;
        }

        // Validación de contraseña: debe contener al menos 10 caracteres, una letra mayúscula y un símbolo
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).{10,}$/;
        if (!passwordRegex.test(registerPassword)) {
            Swal.fire('Error en registro', 'La contraseña debe tener al menos 10 caracteres, una letra mayúscula y un símbolo', 'error');
            return;
        }

        // Validación: Las contraseñas deben coincidir
        if (registerPassword !== registerPassword2) {
            Swal.fire('Error en registro', 'Las contraseñas no son iguales', 'error');
            return;
        }

        try {
            // Llama a la función startRegister para iniciar el proceso de registro con los datos actuales
            await startRegister({ name: registerName, email: registerEmail, password: registerPassword });

            // Si el registro es exitoso, muestra un mensaje de éxito utilizando la librería SweetAlert2
            Swal.fire('Registro exitoso', 'Cuenta creada con éxito', 'success');
        } catch (error) {
            console.error(error); // Manejo básico de errores en consola
        }
    };

    // Efecto que se ejecuta cuando errorMessage cambia
    useEffect(() => {
        if (errorMessage !== undefined) {
            // Muestra un mensaje de error utilizando la librería SweetAlert2 si errorMessage no es undefined
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
    }, [errorMessage]); // Dependencia: se ejecuta cuando errorMessage cambia

    return (
        <>
            <NavbarPub />
            <h1>Regístrate en nuestra tienda</h1>
            <div className={styles.pageContainer}>
                <div className={styles.content}>
                    <form className={styles.registerForm} onSubmit={registerSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="registerName" className={styles.label}>Nombre</label>
                            <input
                                type="text"
                                id="registerName"
                                name="registerName"
                                value={registerName}
                                onChange={onRegisterInputChange}
                                className={styles.input}
                                placeholder="Nombre"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="registerEmail" className={styles.label}>Correo electrónico</label>
                            <input
                                type="email"
                                id="registerEmail"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                                className={styles.input}
                                placeholder="Correo electrónico"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="registerPassword" className={styles.label}>Contraseña</label>
                            <input
                                type="password"
                                id="registerPassword"
                                name="registerPassword"
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                                className={styles.input}
                                placeholder="Contraseña"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="registerPassword2" className={styles.label}>Repita la contraseña</label>
                            <input
                                type="password"
                                id="registerPassword2"
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={onRegisterInputChange}
                                className={styles.input}
                                placeholder="Repita la contraseña"
                            />
                        </div>
                        <button type="submit" className={styles.submitBtn}>Crear cuenta</button>
                    </form>
                    <div className={styles.loginPrompt}>
                        <p>¿Ya tienes cuenta? <Link to="/login" className={styles.loginLink}>Ingresa desde aquí</Link></p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
