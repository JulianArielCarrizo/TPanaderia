import React, { useState } from 'react';
import styles from './ContactPage.module.css';
import { NavbarPub } from '../components/NavBarPub';
import { Footer } from '../components/Footer';

export const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes realizar alguna acción ficticia si deseas, como un console.log o alert
        console.log('Formulario enviado:', formData);
        // Limpiar los campos del formulario
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <>
            <NavbarPub />
            <h1>Contactanos</h1>
            <div className={styles.pageContainer}>
                <div className={styles.content}>
                    <form className={styles.contactForm} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name" className={styles.label}>Nombre</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={styles.input} required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>Correo electrónico</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className={styles.input} required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="message" className={styles.label}>Mensaje</label>
                            <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} className={styles.textarea} required />
                        </div>
                        <button type="submit" className={styles.submitBtn}>Enviar mensaje</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};