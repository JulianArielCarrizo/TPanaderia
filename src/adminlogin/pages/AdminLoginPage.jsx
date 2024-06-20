import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import '../../index.css';
import styles from './AdminLoginPage.module.css';
import { NavbarPub } from '../../home/components/NavBarPub';
import { Footer } from '../../home/components/Footer';

const adminLoginFormFields = {
    adminName: '',
    adminPassword: '',
};

export const AdminLoginPage = () => {
    const { startAdminLogin, errorMessage } = useAuthStore();
    const { adminName, adminPassword, onInputChange: onAdminInputChange } = useForm(adminLoginFormFields);

    const adminLoginSubmit = (event) => {
        event.preventDefault();
        startAdminLogin({ name: adminName, password: adminPassword });
    };

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
    }, [errorMessage]);

    return (
        <>
            <NavbarPub />
            <h3>Admin Login</h3>
            <div className={styles.pageContainer}>
                <div className={styles.content}>
                    <form className={styles.contactForm} onSubmit={adminLoginSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="adminName" className={styles.label}>Nombre de Admin</label>
                            <input
                                type="text"
                                id="adminName"
                                name="adminName"
                                value={adminName}
                                onChange={onAdminInputChange}
                                className={styles.input}
                                placeholder="Nombre de Admin"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="adminPassword" className={styles.label}>Contraseña de Admin</label>
                            <input
                                type="password"
                                id="adminPassword"
                                name="adminPassword"
                                value={adminPassword}
                                onChange={onAdminInputChange}
                                className={styles.input}
                                placeholder="Contraseña de Admin"
                            />
                        </div>
                        <button type="submit" className={styles.submitBtn}>Admin Login</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};