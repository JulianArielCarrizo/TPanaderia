// src/components/Footer/Footer.js
import React from 'react';
import { Link } from 'react-router-dom'; // Si estás usando React Router
import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerColumn}>
                <h4 className={styles.footerColumnTitle}>Contacto</h4>
                <p className={styles.footerContactItem}>Dirección: Av Mitre 1280, San Miguel</p>
                <p className={styles.footerContactItem}>Teléfono: 4 667-7890</p>
                <p className={styles.footerContactItem}>Correo electrónico: info@panaderiapepito.com</p>
                </div>
                <div className={styles.footerColumn}>
                    <h4 className={styles.footerColumnTitle}>Enlaces útiles</h4>
                    <Link to="/" className={styles.footerLink}>Inicio</Link>
                    <Link to="/login" className={styles.footerLink}>Productos</Link> {/* Cambiamos la ruta a /login */}
                    <Link to="/contact" className={styles.footerLink}>Contacto</Link>
                </div>
                <div className={styles.footerColumn}>
                    <h4 className={styles.footerColumnTitle}>Síguenos</h4>
                    <a href="https://facebook.com/panapepito" className={styles.footerLink}>Facebook</a>
                    <a href="https://twitter.com/panapepito" className={styles.footerLink}>Twitter</a>
                    <a href="https://instagram.com/panapepito" className={styles.footerLink}>Instagram</a>
                </div>
            </div>
        </footer>
    );
};
                    

