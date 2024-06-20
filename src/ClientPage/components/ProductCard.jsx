import React from 'react';
import panaderiaApi from '../../api/panaderiaApi'; // Importa la instancia de API configurada
import { Link } from 'react-router-dom'; // Importa el componente Link de React Router
import styles from './ProductCard.module.css'; // Importa los estilos CSS del componente

export const ProductCard = ({ product, onAddFavorite, onRemoveFavorite, showRemoveButton }) => {
    const { _id, nombre_producto, imagen, descripcion_corta, precio, cantidad_stock } = product;

    // Función para manejar la adición de un producto a favoritos
    const handleAddFavorite = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        try {
            // Llama a la API para agregar el producto a la lista de favoritos
            await panaderiaApi.post('/productosfavoritos', { productoId: _id });

            // Si se proporciona la función onAddFavorite, llama a esta función con el ID del producto
            if (onAddFavorite) {
                onAddFavorite(_id);
            }

            // Recarga la página para reflejar los cambios (esto podría optimizarse de otras formas)
            window.location.reload();
        } catch (error) {
            console.error('Error al agregar producto a favoritos:', error);
        }
    };

    // Función para manejar la eliminación de un producto de favoritos
    const handleRemoveFavorite = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        try {
            // Llama a la API para eliminar el producto de la lista de favoritos
            await panaderiaApi.delete(`/productosfavoritos/borrarfavorito/${_id}`);

            // Si se proporciona la función onRemoveFavorite, llama a esta función con el ID del producto
            if (onRemoveFavorite) {
                onRemoveFavorite(_id);
            }
        } catch (error) {
            console.error('Error al quitar producto de favoritos:', error);
        }
    };

    
    return (
        <Link to={`/userdashboard/productos/productos-detalles/${_id}`} className={styles.link}>
            
            <div className={styles.productCard}>
                
                <div className={styles.imageContainer}>
                    <img src={imagen} alt={nombre_producto} className={styles.productImage} />
                    <div className={styles.buttonContainer}>
                      
                        <button onClick={handleAddFavorite} className={`${styles.favoriteButton} ${styles.addFavorite}`}>
                            <i className="fas fa-heart" />
                        </button>
                        {/* Condición para mostrar el botón de eliminar favoritos si showRemoveButton es verdadero y onRemoveFavorite está definido */}
                        {showRemoveButton && onRemoveFavorite && (
                            <button onClick={handleRemoveFavorite} className={`${styles.favoriteButton} ${styles.removeFavorite}`}>
                                <i className="fas fa-trash-alt" />
                            </button>
                        )}
                    </div>
                </div>
              
                <div className={styles.productDetails}>
                    <h3 className={styles.productTitle}>{nombre_producto}</h3>
                    <p className={styles.productDescription}>{descripcion_corta}</p> 
                   
                    <div className={styles.priceAndStock}>
                        <p className={styles.productPrice}>Precio: ${precio}</p> 
                        <p className={styles.productStock}>Stock: {cantidad_stock} u.</p> 
                    </div>
                    <button className={styles.buyButton}>Comprar</button>
                </div>
            </div>
        </Link>
    );
};