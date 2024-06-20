import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate de react-router-dom
import { useAuthStore } from "../../hooks/useAuthStore"; // Importa el hook personalizado useAuthStore
import styles from './UserNavBar.module.css'; // Importa los estilos del módulo CSS
import { MenuIcon } from './MenuIcon'; // Importa el componente MenuIcon
import { Avatar } from './Avatar'; // Importa el componente Avatar
import { ProductCounter } from './ProductCounter'; // Importa el componente ProductCounter
import { FavoriteCounter } from './FavoriteCounter'; // Importa el componente FavoriteCounter
import logo from '../../assets/images/pana-48.png'; // Importa la imagen del logo

export const Navbar = ({ isActive, toggleMenu, iconColor }) => {
  const { startLogout, user } = useAuthStore(); // Obtiene funciones y datos de autenticación del hook useAuthStore
  const [isMenuActive, setIsMenuActive] = useState(false); // Estado para controlar la visibilidad del menú desplegable
  const [activeLink, setActiveLink] = useState('/userdashboard/productos'); // Estado para almacenar el enlace activo actual
  const [productCount, setProductCount] = useState(0); // Estado para contar productos en el carrito
  const navigate = useNavigate(); // Hook de navegación para redireccionar a otras páginas

  // Maneja el clic en el icono de menú
  const handleMenuClick = () => {
    setIsMenuActive(!isMenuActive); // Invierte el estado de visibilidad del menú
    toggleMenu(); // Llama a la función proporcionada para manejar el estado del menú
  };

  // Maneja la navegación a una ruta específica y actualiza el enlace activo
  const handleNavigation = (path) => {
    setActiveLink(path); // Establece la nueva ruta como enlace activo
    navigate(path); // Navega a la ruta especificada usando el hook useNavigate
  };

  // Actualiza el enlace activo basado en la ubicación actual de la ventana
  const updateActiveLink = () => {
    if (activeLink === '/userdashboard/productos' && window.location.pathname !== '/userdashboard/productos') {
      setActiveLink(window.location.pathname); // Actualiza el enlace activo si la ruta ha cambiado
    }
  };

  useEffect(() => {
    updateActiveLink(); // Ejecuta la función para actualizar el enlace activo inicialmente
  }, []);

  // Escucha los cambios en la historia de navegación para actualizar el enlace activo
  useEffect(() => {
    window.addEventListener('popstate', updateActiveLink); // Agrega un event listener para popstate (navegación hacia atrás/adelante)
    return () => window.removeEventListener('popstate', updateActiveLink); // Limpia el event listener al desmontar el componente
  }, [activeLink]); // Se ejecuta cada vez que activeLink cambia

  // Calcula y actualiza la cantidad de productos en el carrito basado en localStorage
  useEffect(() => {
    const user = localStorage.getItem('user'); // Obtiene el usuario del localStorage
    if (user) {
      const userCart = JSON.parse(localStorage.getItem(user)) || []; // Obtiene el carrito del usuario o crea uno vacío
      const uniqueProducts = new Set(userCart.map(item => item.id)); // Usa un Set para obtener productos únicos por ID
      setProductCount(uniqueProducts.size); // Actualiza el contador de productos únicos en el carrito
    } else {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Obtiene los elementos del carrito o crea uno vacío
      const uniqueProducts = new Set(cartItems.map(item => item.id)); // Usa un Set para obtener productos únicos por ID
      setProductCount(uniqueProducts.size); // Actualiza el contador de productos únicos en el carrito
    }
  }, []); // Se ejecuta una vez al cargar el componente

  // Redirige a la página del carrito al hacer clic en el enlace correspondiente
  const goToCart = () => {
    handleNavigation('/userdashboard/carrito');
  };

  // Redirige a la página de favoritos al hacer clic en el enlace correspondiente
  const goToFavorites = () => {
    handleNavigation('/userdashboard/favoritos');
  };

  // Redirige a la página de productos al hacer clic en el enlace correspondiente
  const goToProducts = () => {
    handleNavigation('/userdashboard/productos');
  };

  // Redirige a la página de pedidos al hacer clic en el enlace correspondiente
  const goToOrders = () => {
    handleNavigation('/userdashboard/orders');
  };

  // Función para manejar la actualización del contador de favoritos (si es necesario)
  const updateFavoriteCount = (count) => {
    // Aquí puedes manejar el estado de los favoritos si es necesario
  };

  // Renderizado del componente Navbar
  return (
    <div id={styles['main-container']}>
      <div id={styles['content-container']}>
        <div id={styles.menu} className={isActive ? styles['show-menu'] : ''}>
          <div id={styles.logo} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={styles.menuIconContainer}>
                <MenuIcon active={isMenuActive} iconColor={iconColor} onClick={handleMenuClick} /> {/* Renderiza el componente MenuIcon */}
              </div>
              <h1>Panaderia <img src={logo} alt="" /> Pepito</h1> {/* Renderiza el título con el logo */}
            </div>
            <div id={styles.profile} className="flex items-center">
              <Avatar name={user.name} /> {/* Renderiza el componente Avatar con el nombre del usuario */}
              <div className="ml-2">
                <p className={styles.username}>Bienvenid@, {user.name}</p> {/* Muestra el nombre de usuario */}
                <a href="#" className={styles['link-salir']}>
                  <span></span>
                  <button
                    className="btn btn-outline-danger bg-grey"
                    onClick={startLogout}
                  >Salir</button> {/* Botón para cerrar sesión */}
                </a>
              </div>
            </div>
          </div>
          <div id={styles.nav}>
            <a
              href="#"
              className={`${styles['nav-link']} ${activeLink === '/userdashboard/productos' ? styles.active : ''}`}
              onClick={goToProducts}
            >
              <div className={styles['nav-text']}>
                <span>Productos</span>
                <span>Ver los Productos</span>
              </div>
            </a>
            <a
              href="#"
              className={`${styles['nav-link']} ${activeLink === '/userdashboard/carrito' ? styles.active : ''}`}
              onClick={goToCart}
            >
              <div className={styles['nav-text']}>
                <span>Carrito</span>
                <span>Items en el carrito: <ProductCounter count={productCount} /></span> {/* Renderiza el componente ProductCounter con el conteo de productos */}
              </div>
            </a>
            <a
              href="#"
              className={`${styles['nav-link']} ${activeLink === '/userdashboard/favoritos' ? styles.active : ''}`}
              onClick={goToFavorites}
            >
              <div className={styles['nav-text']}>
                <span>Favoritos</span>
                <span>Productos favoritos: <FavoriteCounter updateFavoriteCount={updateFavoriteCount} /></span> {/* Renderiza el componente FavoriteCounter */}
              </div>
            </a>
            <a
              href="#"
              className={`${styles['nav-link']} ${activeLink === '/userdashboard/orders' ? styles.active : ''}`}
              onClick={goToOrders}
            >
              <div className={styles['nav-text']}>
                <span>Pedidos</span>
                <span>Ver pedidos</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};