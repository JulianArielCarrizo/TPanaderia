import React from 'react';
import { ProductCard } from './ProductCard'; // Importa el componente ProductCard
import styles from './ProductGrid.module.css'; // Importa los estilos CSS del componente

export const ProductGrid = ({ products, handleRemoveFavorite, handleAddFavorite, showRemoveButton }) => {
    // Renderiza un contenedor de cuadrícula con productos
    return (
        <div className={styles.gridContainer}>
            {/* Mapea sobre la lista de productos y renderiza cada tarjeta de producto */}
            {products.map(product => (
                <ProductCard
                    key={product._id} // Clave única para cada tarjeta de producto
                    product={product} // Propiedad product pasada al componente ProductCard
                    onAddFavorite={handleAddFavorite} // Función para manejar la adición de favoritos
                    onRemoveFavorite={handleRemoveFavorite} // Función para manejar la eliminación de favoritos
                    showRemoveButton={showRemoveButton} // Propiedad booleana para mostrar el botón de eliminar
                />
            ))}
        </div>
    );
};