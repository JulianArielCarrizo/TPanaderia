import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/UserNavbar';
import { MenuIcon } from '../components/MenuIcon';
import styles from './CartPage.module.css';
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa'; // Importar el icono FaTrash desde react-icons
import { Link } from 'react-router-dom'; // Importar Link desde react-router-dom

export const CartPage = () => {
    const [cartItems, setCartItems] = useState([]); // Estado para almacenar los productos en el carrito
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(''); // Estado para almacenar el método de pago seleccionado
    const [showMenu, setShowMenu] = useState(false); // Estado para controlar la visibilidad del menú

    // Efecto para cargar los productos del carrito desde el localStorage al montar el componente
    useEffect(() => {
        const storedItems = localStorage.getItem('cartItems'); // Obtener los productos del carrito desde el localStorage
        if (storedItems) {
            setCartItems(JSON.parse(storedItems)); // Establecer los productos del carrito en el estado
        }
    }, []);

    // Función para eliminar un producto del carrito
    const removeFromCart = (index) => {
        const newCartItems = [...cartItems]; // Crear una copia de los productos del carrito
        newCartItems.splice(index, 1); // Eliminar el producto del carrito en el índice especificado
        setCartItems(newCartItems); // Actualizar el estado del carrito
        localStorage.setItem('cartItems', JSON.stringify(newCartItems)); // Actualizar el localStorage con el nuevo carrito
    };

    // Calcular el total a pagar sumando los precios de todos los productos en el carrito
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Función para manejar la compra
    const handlePurchase = () => {
        if (!selectedPaymentMethod) {
            Swal.fire({
                icon: 'warning',
                title: 'Debe elegir método de pago',
                showConfirmButton: true
            });
            return; // Salir si no se ha seleccionado un método de pago
        }

        Swal.fire({
            icon: 'success',
            title: '¡Compra realizada con éxito!',
            showConfirmButton: false,
            timer: 2000
        }).then(() => {
            const orderDetails = {
                items: cartItems,
                total,
            };

            localStorage.setItem('orderDetails', JSON.stringify(orderDetails)); // Guardar los detalles del pedido en el localStorage

            setCartItems([]); // Vaciar el carrito
            localStorage.removeItem('cartItems'); // Eliminar los productos del carrito del localStorage

            // Redireccionar a la página de pedidos después de 2 segundos
            setTimeout(() => {
                window.location.href = '/userdashboard/orders';
            }, 1000);
        });
    };

    // Función para alternar la visibilidad del menú
    const toggleMenu = () => {
        setShowMenu(prevShowMenu => !prevShowMenu);
    };

    return (
        <>
            <Navbar isActive={showMenu} toggleMenu={toggleMenu} /> {/* Navbar con control de visibilidad del menú */}
            <div className={styles.content}>
                <div className={styles.dashboardHeader}>
                    <div className={styles.sideTitleContainer}>
                        <MenuIcon active={showMenu} toggleMenu={toggleMenu} /> {/* Icono del menú */}
                        <h2 className={styles.sideTitle}>Panadería Pepito</h2> {/* Título del dashboard */}
                    </div>
                </div>
                <h2 className={styles.cartTitle}>Carrito de Compras</h2> {/* Título de la página del carrito */}
                {cartItems.length === 0 ? (
                    <p className={styles.emptyCartMessage}>No hay productos en el carrito</p> // Mensaje cuando el carrito está vacío
                ) : (
                    <div className={styles.cartContent}>
                        <h3 className={styles.cartContentTitle}>Tu pedido:</h3> {/* Título de los productos en el carrito */}
                        <div className={styles.tableContainer}>
                            <table className={styles.cartItems}>
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Eliminar</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item, index) => (
                                        <tr className={styles.cartItem} key={index}>
                                            <td><img src={item.image} alt={item.name} className={styles.itemImage} /></td> {/* Imagen del producto */}
                                            <td>{item.name}</td> {/* Nombre del producto */}
                                            <td><button className={styles.deleteButton} onClick={() => removeFromCart(index)}><FaTrash /></button></td> {/* Botón para eliminar el producto */}
                                            <td>x {item.quantity} u.</td> {/* Cantidad del producto */}
                                            <td>${item.price}</td> {/* Precio del producto */}
                                            <td>${item.price * item.quantity}</td> {/* Total por producto */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className={styles.cartTotalContainer}>
                            <div className={styles.cartTotal}>Total a Pagar: ${total}</div> {/* Total a pagar */}
                        </div>
                    </div>
                )}
                {cartItems.length > 0 && (
                    <div className={styles.paymentMethodContainer}>
                        <h3 className={styles.paymentMethodTitle}>Métodos de Pago</h3> {/* Título de métodos de pago */}
                        <label>
                            <input 
                                type="radio" 
                                name="paymentMethod" 
                                value="MercadoPago" 
                                className={styles.paymentInput} 
                                onChange={(e) => setSelectedPaymentMethod(e.target.value)} 
                            />
                            Mercado Pago
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="paymentMethod" 
                                value="TarjetaCredito" 
                                className={styles.paymentInput} 
                                onChange={(e) => setSelectedPaymentMethod(e.target.value)} 
                            />
                            Tarj. Crédito
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="paymentMethod" 
                                value="TarjetaDevito" 
                                className={styles.paymentInput} 
                                onChange={(e) => setSelectedPaymentMethod(e.target.value)} 
                            />
                            Tarj. Débito
                        </label>
                    </div>
                )}
                {cartItems.length > 0 && (
                    <div className={styles.buttonContainer}>
                        <Link to="/userdashboard/productos" className={styles.continueShoppingButton}>Seguir Comprando</Link> {/* Botón para seguir comprando */}
                        <button className={styles.buyButton} onClick={handlePurchase}>Comprar</button> {/* Botón para realizar la compra */}
                    </div>
                )}
            </div>
            <div className={styles.mobileMenuIcon}>
                <MenuIcon active={showMenu} toggleMenu={toggleMenu} /> {/* Icono del menú para dispositivos móviles */}
            </div>
        </>
    );
};