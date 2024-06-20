import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/UserNavbar';
import { ProductGrid } from '../components/ProductGrid';
import { MenuIcon } from '../components/MenuIcon';
import { useAuthStore } from '../../hooks';
import panaderiaApi from '../../api/panaderiaApi'; // Importa la instancia de API configurada
import styles from './FavoritePage.module.css';

export const FavoritePage = () => {
    const [favoriteProducts, setFavoriteProducts] = useState([]); // Estado para almacenar productos favoritos
    const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos
    const [error, setError] = useState(null); // Estado para manejar errores en la carga de datos
    const [showMenu, setShowMenu] = useState(false); // Estado para manejar la visibilidad del menú

    const [favoriteCount, setFavoriteCount] = useState(0); // Contador de favoritos

    // Función para cargar los productos favoritos desde el servidor
    const fetchFavoriteProducts = async () => {
        try {
            const response = await panaderiaApi.get('/productosfavoritos'); // Solicitud para obtener productos favoritos
            setFavoriteProducts(response.data.productos); // Guardar productos favoritos en el estado
            setFavoriteCount(response.data.productos.length); // Actualizar el contador al cargar los favoritos
            setLoading(false); // Indicar que la carga ha terminado
        } catch (error) {
            setError('Error fetching favorite products'); // Manejar errores en la carga de datos
            setLoading(false); // Indicar que la carga ha terminado
        }
    };

    // Efecto para cargar los productos favoritos al montar el componente
    useEffect(() => {
        fetchFavoriteProducts(); // Llamar a la función para obtener productos favoritos
    }, []);

    const toggleMenu = () => {
        setShowMenu(prevShowMenu => !prevShowMenu); // Alternar la visibilidad del menú
    };

    const handleAddFavorite = async (productId) => {
        try {
            await panaderiaApi.post('/productosfavoritos', { productoId: productId }); // Agregar producto a favoritos

            // Actualizar la lista de productos favoritos
            setFavoriteProducts(prevFavorites => [...prevFavorites, { _id: productId }]);
            setFavoriteCount(prevCount => prevCount + 1); // Incrementar el contador

            // Volver a cargar los productos favoritos para asegurar que estén actualizados
            fetchFavoriteProducts();

        } catch (error) {
            console.error('Error al agregar producto a favoritos:', error); // Manejar errores al agregar favorito
        }
    };

    const handleRemoveFavorite = async (productId) => {
        try {
            await panaderiaApi.delete(`/productosfavoritos/borrarfavorito/${productId}`); // Quitar producto de favoritos

            // Actualizar la lista de productos favoritos
            setFavoriteProducts(prevFavorites => prevFavorites.filter(product => product._id !== productId));
            setFavoriteCount(prevCount => prevCount - 1); // Decrementar el contador

        } catch (error) {
            console.error('Error al quitar producto de favoritos:', error); // Manejar errores al quitar favorito
        }
    };

    return (
        <>
            <Navbar isActive={showMenu} toggleMenu={toggleMenu} favoriteCount={favoriteCount} /> {/* Navbar con control de visibilidad del menú y contador de favoritos */}
            <div className={styles.content}>
                <div className={styles.dashboardHeader}>
                    <div className={styles.sideTitleContainer}>
                        <MenuIcon active={showMenu} toggleMenu={toggleMenu} /> {/* Icono del menú */}
                        <h2 className={styles.sideTitle}>Panadería Pepito</h2> {/* Título del dashboard */}
                    </div>
                </div>
                <h2 className={styles['products-title']}>Favoritos</h2> {/* Título de la sección de favoritos */}
                <div className={styles.productContainer}>
                    {loading ? (
                        <p className={styles.message}>Cargando...</p> // Mensaje de carga
                    ) : error ? (
                        <p className={styles.message}>{error}</p> // Mensaje de error
                    ) : favoriteProducts.length === 0 ? (
                        <p className={styles.message}>No hay productos en su lista de favoritos.</p> // Mensaje cuando no hay favoritos
                    ) : (
                        <ProductGrid
                            products={favoriteProducts}
                            showRemoveButton={true}
                            handleRemoveFavorite={handleRemoveFavorite}
                            handleAddFavorite={handleAddFavorite}
                        /> // Componente ProductGrid con productos favoritos y funciones para manejar favoritos
                    )}
                </div>
            </div>
            <div className={styles['mobile-menu-icon']}>
                <MenuIcon active={showMenu} toggleMenu={toggleMenu} /> {/* Icono del menú para dispositivos móviles */}
            </div>
        </>
    );
};