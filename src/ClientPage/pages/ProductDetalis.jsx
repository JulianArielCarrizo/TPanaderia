import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/UserNavbar';
import panaderiaApi from '../../api/panaderiaApi'; // Importa la instancia de API configurada
import styles from './ProductDetails.module.css'; // Importa los estilos del módulo CSS

export const ProductDetails = () => {
    const { id } = useParams(); // Obtiene el parámetro de la URL
    const [product, setProduct] = useState(null); // Estado para almacenar los detalles del producto
    const [loading, setLoading] = useState(true); // Estado para indicar si se está cargando
    const [error, setError] = useState(null); // Estado para manejar errores
    const [quantity, setQuantity] = useState(1); // Estado para la cantidad seleccionada

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await panaderiaApi.get(`/productos/${id}`); // Petición para obtener detalles del producto por ID
                setProduct(response.data.producto); // Establece los detalles del producto en el estado
                setLoading(false); // Finaliza la carga
            } catch (error) {
                setError('Error fetching product details'); // Captura y maneja errores de la petición
                setLoading(false); // Finaliza la carga en caso de error
            }
        };

        fetchProductDetails(); // Llama a la función para obtener los detalles del producto
    }, [id]); // Dependencia para ejecutar el efecto cuando cambie el ID en la URL

    // Función para disminuir la cantidad seleccionada
    const handleDecreaseQuantity = () => {
        setQuantity(quantity > 1 ? quantity - 1 : 1); // Actualiza la cantidad seleccionada, asegurando que no sea menor que 1
    };

    // Función para aumentar la cantidad seleccionada
    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1); // Incrementa la cantidad seleccionada
    };

    // Función para agregar el producto al carrito
    const handleAddToCart = () => {
        const cartItem = {
            id: product._id,
            name: product.nombre_producto,
            image: product.imagen,
            price: product.precio,
            quantity: quantity,
            totalPrice: product.precio * quantity // Calcula el precio total del producto
        };

        const user = localStorage.getItem('user'); // Obtiene el usuario del localStorage
        if (user) {
            const userCart = JSON.parse(localStorage.getItem(user)) || []; // Obtiene el carrito del usuario o crea uno nuevo
            const existingItemIndex = userCart.findIndex(item => item.id === product._id); // Busca el índice del producto en el carrito del usuario
            if (existingItemIndex !== -1) {
                // Si el producto ya está en el carrito, incrementa la cantidad
                userCart[existingItemIndex].quantity += quantity;
            } else {
                // Si el producto no está en el carrito, lo agrega con cantidad 1
                userCart.push(cartItem);
            }
            localStorage.setItem(user, JSON.stringify(userCart)); // Actualiza el carrito del usuario en el localStorage
        } else {
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Obtiene los elementos del carrito o crea uno nuevo
            const existingItemIndex = cartItems.findIndex(item => item.id === product._id); // Busca el índice del producto en el carrito
            if (existingItemIndex !== -1) {
                // Si el producto ya está en el carrito, incrementa la cantidad
                cartItems[existingItemIndex].quantity += quantity;
            } else {
                // Si el producto no está en el carrito, lo agrega con cantidad 1
                cartItems.push(cartItem);
            }
            localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Actualiza los elementos del carrito en el localStorage
        }

        // Redirige a la página del carrito después de agregar el producto
        window.location.href = '/userdashboard/carrito';
    };

    // Renderizado condicional mientras se carga el producto
    if (loading) {
        return <p>Cargando...</p>; // Muestra un mensaje de carga mientras se obtienen los detalles del producto
    }

    // Renderizado condicional en caso de error al obtener los detalles del producto
    if (error) {
        return <p>{error}</p>; // Muestra un mensaje de error si no se pueden obtener los detalles del producto
    }

    // Renderiza la página de detalles del producto una vez que se han cargado y no hay errores
    return (
        <>
            <Navbar /> {/* Renderiza la barra de navegación superior */}
            <div className={styles.container}> {/* Contenedor principal con estilos específicos */}
                <div className={styles.productDetails}> {/* Contenedor de los detalles del producto */}
                    <h1 className={styles.descriptionTitle}>Detalles del producto:</h1> {/* Título de los detalles del producto */}
                    <div className={styles.detailsContainerWrapper}>
                        <div className={styles.detailsContainer}>
                            <div className={styles.imageContainer}>
                                <img src={product.imagen} alt={product.nombre_producto} className={styles.productImage} /> {/* Imagen del producto */}
                            </div>
                            <div className={styles.infoContainer}>
                                <h3 className={styles.productTitle}>{product.nombre_producto}</h3> {/* Nombre del producto */}
                                <p>Precio: ${product.precio}</p> {/* Precio del producto */}
                                <p>Stock: {product.cantidad_stock} <span>{product.cantidad_stock > 1 ? 'unidades' : 'unidad'}</span></p> {/* Stock del producto */}
                                <p>{product.descripcion_larga}</p> {/* Descripción larga del producto */}
                                <div className={styles.quantityControls}>
                                    <button className={styles.btnCount} onClick={handleDecreaseQuantity}>-</button> {/* Botón para disminuir la cantidad */}
                                    <span className={styles.quantity}>{quantity}</span> {/* Muestra la cantidad seleccionada */}
                                    <button className={styles.btnCount} onClick={handleIncreaseQuantity}>+</button> {/* Botón para aumentar la cantidad */}
                                </div>
                                <div className={styles.actionButtons}>
                                    <button className={styles.carritoBtn} onClick={handleAddToCart}>Agregar al carrito</button> {/* Botón para agregar al carrito */}
                                    <Link to="/userdashboard/productos" className={styles.volverBtn}>Volver</Link> {/* Enlace para volver a la lista de productos */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};