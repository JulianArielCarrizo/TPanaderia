import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomeProductCard.module.css';

export const HomeProductCard = ({ product }) => {
  const { _id, nombre_producto, imagen, descripcion_corta, precio, cantidad_stock } = product;

  return (
    <Link to={`/pub/productos/productos-detalles/${_id}`} className={styles.link}>
      <div className={styles.productCard}>
        <div className={styles.imageContainer}>
          <img src={imagen} alt={nombre_producto} className={styles.productImage} />
        </div>
        <div className={styles.productDetails}>
          <h3 className={styles.productTitle}>{nombre_producto}</h3>
          <p className={styles.productDescription}>{descripcion_corta}</p>
          <div className={styles.priceAndStock}>
            <p className={styles.productPrice}>Precio: ${precio}</p>
          </div>
          <button className={styles.buyButton}>Comprar</button>
        </div>
      </div>
    </Link>
  );
};
          
