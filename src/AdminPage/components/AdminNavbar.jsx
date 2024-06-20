import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "../../hooks/useAuthStore";
import styles from './AdminNavbar.module.css'; // Importa el módulo CSS
import { MenuIcon } from '../../ClientPage/components/MenuIcon';
import { Avatar } from '../../ClientPage/components/Avatar'; // Importa el componente Avatar
import logo from '../../assets/images/pana-48.png';

export const NavbarAd = () => {
    const { startLogout, user } = useAuthStore();
    const [isMenuActive, setIsMenuActive] = useState(false);
    const [activeLink, setActiveLink] = useState('/admindashboard/crud');
    const navigate = useNavigate();

    const handleMenuClick = () => {
        setIsMenuActive(!isMenuActive);
    };

    const handleNavigation = (path) => {
        setActiveLink(path);
        navigate(path, { replace: true });
    };

    useEffect(() => {
        setActiveLink(window.location.pathname);
    }, []);

    const goToProducts = () => {
        handleNavigation('/admindashboard/crud');
    };

    return (
        <div id={styles['main-container']}>
            <div id={styles['content-container']}>
                <div id={styles.menu} className={isMenuActive ? styles['show-menu'] : ''}>
                    <div id={styles.logo} className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className={styles.menuIconContainer}>
                                <MenuIcon active={isMenuActive} onClick={handleMenuClick} />
                            </div>
                            <h1>Panaderia <img src={logo} alt="" /> Pepito</h1>
                        </div>
                        <div id={styles.profile} className="flex items-center">
                            <Avatar name={user.name} /> {/* Avatar con el nombre del usuario */}
                            <div className="ml-2">
                                <p className={styles.username}>Bienvenid@, {user.name}</p>
                                <a href="#" className={styles['link-salir']}>
                                    <span></span>
                                    <button
                                        className="btn btn-outline-danger bg-grey"
                                        onClick={startLogout}
                                    >Salir</button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div id={styles.nav}>
                        <a
                            href="#"
                            className={`${styles['nav-link']} ${activeLink === '/admindashboard/crud' ? styles.active : ''}`}
                            onClick={goToProducts}
                        >
                            <div className={styles['nav-text']}>
                                <span>Productos</span>
                                <span>Modificar Productos</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};