import React, { useEffect, useState } from 'react';
import styles from './ProductCounter.module.css'; // Importa el módulo CSS

export const ProductCounter = () => {
    // Estado para almacenar el contador de productos únicos en el carrito
    const [productCount, setProductCount] = useState(0);

    // Efecto para actualizar el contador de productos
    useEffect(() => {
        // Función para obtener el número de productos únicos en el carrito
        const updateProductCount = () => {
            const user = localStorage.getItem('user');
            if (user) {
                // Obtener el carrito del usuario desde el almacenamiento local
                const userCart = JSON.parse(localStorage.getItem(user)) || [];
                // Utilizar un conjunto para obtener productos únicos por ID
                const uniqueProducts = new Set(userCart.map(item => item.id));
                // Actualizar el estado con el tamaño del conjunto (número de productos únicos)
                setProductCount(uniqueProducts.size);
            } else {
                // Si no hay usuario identificado, obtener el carrito de items generales
                const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                // Utilizar un conjunto para obtener productos únicos por ID
                const uniqueProducts = new Set(cartItems.map(item => item.id));
                // Actualizar el estado con el tamaño del conjunto (número de productos únicos)
                setProductCount(uniqueProducts.size);
            }
        };

        updateProductCount(); // Llamar a la función de actualización al montar el componente
    }, []);

    // Renderizar el contador de productos con estilos definidos en ProductCounter.module.css
    return (
        <span className={styles['product-counter']}>{productCount}</span>
    );
};