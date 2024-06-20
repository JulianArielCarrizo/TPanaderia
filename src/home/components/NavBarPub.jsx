import React, { useState } from 'react';
import styles from './NavBarPub.module.css';
import logo from '../../assets/images/pana-48.png'

export const NavbarPub = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.publicnavbarNavbar}>
      <div className={styles.publicnavbarLogo}><a href="/"> <img src={logo} alt="" className={styles.logo}/>Panaderia Pepito</a></div>
      <div className={isMenuOpen ? `${styles.publicnavbarMenu} ${styles.active}` : styles.publicnavbarMenu}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/register">Registro</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/contact">Contacto</a></li>
          <li><a href="/about"> about </a></li>
        </ul>
      </div>
      <div className={styles.publicnavbarHamburger} onClick={toggleMenu}>
        <div className={isMenuOpen ? `${styles.publicnavbarLine} ${styles.open}` : styles.publicnavbarLine}></div>
        <div className={isMenuOpen ? `${styles.publicnavbarLine} ${styles.open}` : styles.publicnavbarLine}></div>
        <div className={isMenuOpen ? `${styles.publicnavbarLine} ${styles.open}` : styles.publicnavbarLine}></div>
      </div>
    </nav>
  );
};