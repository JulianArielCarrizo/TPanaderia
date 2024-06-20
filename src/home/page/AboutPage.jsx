import React from 'react';
import styles from './AboutPage.module.css';
import { NavbarPub } from '../components/NavBarPub';
import { Footer } from '../components/Footer';
import imageNuestraHistoria from '../../assets/images/about-01.jpg';
import imageNuestroCompromiso from '../../assets/images/about-02.jpg';
import imageNuestraVariedad from '../../assets/images/about-03.jpg';

export const AboutPage = () => {
    return (
        <>
            <NavbarPub />
                <h1>Sobre Nosotros</h1>
           
            <div className={styles.pageContainer}>
                <div className={styles.section}>
                    <div className={styles.imageContainer}>
                        <img src={imageNuestraHistoria} alt="Nuestra Historia" />
                    </div>
                    <div className={styles.textContainer}>
                        <h2>Nuestra Historia</h2>
                        <p>
                            Nuestra panadería familiar tiene sus raíces en la pasión por el pan artesanal, iniciada hace décadas por nuestros abuelos. Desde entonces, hemos dedicado nuestros esfuerzos a preservar la tradición familiar y ofrecer productos de calidad.
                        </p>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.imageContainer}>
                        <img src={imageNuestroCompromiso} alt="Nuestro Compromiso" />
                    </div>
                    <div className={styles.textContainer}>
                        <h2>Nuestro Compromiso</h2>
                        <p>
                            En nuestra panadería, nos comprometemos a utilizar ingredientes naturales y técnicas artesanales para garantizar la frescura y el sabor de nuestros productos. Cada pan y cada pastel reflejan nuestra dedicación y amor por la panificación.
                        </p>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.imageContainer}>
                        <img src={imageNuestraVariedad} alt="Nuestra Variedad de Productos" />
                    </div>
                    <div className={styles.textContainer}>
                        <h2>Nuestra Variedad de Productos</h2>
                        <p>
                            Ofrecemos una amplia gama de productos horneados, desde panes tradicionales hasta pasteles elaborados. Cada uno de nuestros productos es elaborado con cuidado y atención al detalle para satisfacer los gustos más exigentes de nuestra comunidad.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
