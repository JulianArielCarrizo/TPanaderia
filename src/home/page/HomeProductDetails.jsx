import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavbarPub } from '../components/NavBarPub';
import panaderiaApi from '../../api/panaderiaApi';
import styles from './HomeProductDetails.module.css';
import { Footer } from '../components/Footer';
import { FaShoppingCart } from 'react-icons/fa';

export const HomeProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await panaderiaApi.get(`/productos/${id}`);
                setProduct(response.data.producto);
                setLoading(false);
            } catch (error) {
                setError('Error fetching product details');
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleDecreaseQuantity = () => {
        setQuantity(quantity > 1 ? quantity - 1 : 1);
    };

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleGoBack = () => {
        window.location.href = "/"; // Adjust the URL as needed
    };

    const handleAddToCart = () => {
        window.location.href = "/login"; // Redirect to login
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <NavbarPub />
            <div className={styles.container}>
                <div className={styles.mainContent}>
                    <div className={styles.productDetails}>
                        <h1 className={styles.descriptionTitle}>Detalles del producto:</h1>
                        <div className={styles.detailsContainerWrapper}>
                            <div className={styles.detailsContainer}>
                                <div className={styles.imageContainer}>
                                    <img src={product.imagen} alt={product.nombre_producto} className={styles.productImage} />
                                </div>
                                <div className={styles.infoContainer}>
                                    <h3 className={styles.productTitle}>{product.nombre_producto}</h3>
                                    <p>Precio: ${product.precio}</p>
                                    <p>Stock: {product.cantidad_stock} <span>{product.cantidad_stock > 1 ? 'unidades' : 'unidad'}</span></p>
                                    <p>{product.descripcion_larga}</p>
                                    <div className={styles.quantityControls}>
                                        <button className={styles.btnCount} onClick={handleDecreaseQuantity}>-</button>
                                        <span className={styles.quantity}>{quantity}</span>
                                        <button className={styles.btnCount} onClick={handleIncreaseQuantity}>+</button>
                                    </div>
                                    <div className={styles.actionButtons}>
                                        <button className={styles.carritoBtn} onClick={handleAddToCart}>
                                        <FaShoppingCart style={{ fontSize: '1em' }} /> comprar{/* Icono de carrito */}
                                        </button>
                                        <button className={styles.volverBtn} onClick={handleGoBack}>Volver</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};