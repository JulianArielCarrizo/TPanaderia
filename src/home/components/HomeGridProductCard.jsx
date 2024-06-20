import React from 'react';
import { HomeProductCard } from './HomeProductCard';
import styles from './HomeGridProductCard.module.css';

export const HomeGridProductCard = ({ products }) => {
  return (
    <div className={styles.gridContainer}>
      {products.map(product => (
        <HomeProductCard
          key={product._id}
          product={product} // Pasamos el objeto completo del producto
        />
      ))}
    </div>
  );
};