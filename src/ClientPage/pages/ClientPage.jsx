import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from '../components/UserNavbar';
import { ProductGrid } from '../components/ProductGrid';
import { MenuIcon } from '../components/MenuIcon';
import { useAuthStore } from '../../hooks';
import styles from './ClientPage.module.css';
import { panaderiaApi } from '../../api';

export const ClientPage = () => {
    const [products, setProducts] = useState([]); // Estado para almacenar los productos
    const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos
    const [error, setError] = useState(null); // Estado para manejar errores en la carga de datos
    const [showMenu, setShowMenu] = useState(false); // Estado para manejar la visibilidad del menú
    const { user } = useAuthStore(); // Obtener el usuario autenticado del store

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Hacer una solicitud para obtener los productos desde la API
                const response = await panaderiaApi.get('/productos', {
                    headers: {
                        'x-token': localStorage.getItem('token') // Enviar el token de autenticación en los headers
                    }
                });
                setProducts(response.data.productos); // Guardar los productos en el estado
                setLoading(false); // Indicar que la carga ha terminado
            } catch (error) {
                setError('Error fetching products'); // Manejar errores en la carga de datos
                setLoading(false); // Indicar que la carga ha terminado
            }
        };

        fetchProducts(); // Llamar a la función para obtener los productos cuando el componente se monta
    }, []);

    const toggleMenu = () => {
        setShowMenu(prevShowMenu => !prevShowMenu); // Alternar la visibilidad del menú
    };

    return (
        <>
            <Navbar isActive={showMenu} toggleMenu={toggleMenu} /> {/* Navbar con control de visibilidad del menú */}
            <div className={`${styles.content} ${showMenu ? styles.showDashboard : ''}`}>
                <div className={styles.dashboardHeader}>
                    <div className={styles.sideTitleContainer}>
                        <MenuIcon active={showMenu} toggleMenu={toggleMenu} /> {/* Icono del menú */}
                        <h2 className={styles.sideTitle}>Panadería Pepito</h2> {/* Título del dashboard */}
                    </div>
                </div>
                <h2 className={styles['products-title']}>Productos</h2> {/* Título de la sección de productos */}
                <div className={`${styles.productContainer} ${styles.container}`}>
                    {loading ? (
                        <p className={styles.message}>Cargando...</p> // Mensaje de carga
                    ) : error ? (
                        <p className={styles.message}>{error}</p> // Mensaje de error
                    ) : (
                        <ProductGrid
                            products={products}
                            favoritos={user ? user.favoritos : []} // Pasar productos y favoritos al componente ProductGrid
                        />
                    )}
                </div>
            </div>
            <div className={styles['mobile-menu-icon']}>
                <MenuIcon active={showMenu} toggleMenu={toggleMenu} /> {/* Icono del menú para dispositivos móviles */}
            </div>
        </>
    );
};