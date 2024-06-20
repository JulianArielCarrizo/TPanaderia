import React, { useEffect, useState } from 'react';
import panaderiaApi from '../../api/panaderiaApi'; // Importa la instancia de API configurada
import styles from './FavoriteCounter.module.css'; // Importar estilos CSS

export const FavoriteCounter = ({ updateFavoriteCount }) => {
  // Estado para almacenar el contador de productos favoritos
  const [favoriteCount, setFavoriteCount] = useState(0);

  // Efecto para actualizar el contador de productos favoritos
  useEffect(() => {
    // Función asíncrona para obtener el número de productos favoritos
    const fetchFavoriteCount = async () => {
      try {
        // Llama a la API para obtener la lista de productos favoritos
        const response = await panaderiaApi.get('/productosfavoritos');
        // Actualiza el estado con la longitud del array de productos favoritos
        setFavoriteCount(response.data.productos.length);
      } catch (error) {
        console.error('Error fetching favorite products:', error); // Maneja errores si la solicitud falla
      }
    };

    fetchFavoriteCount(); // Llama a la función de obtención de productos favoritos al montar o actualizar el componente
  }, [updateFavoriteCount]); // Dependencia que hace que el efecto se ejecute cuando se actualiza el contador de favoritos

  // Renderiza el contador de favoritos con estilos definidos en FavoriteCounter.module.css
  return (
    <span className={styles['favorite-counter']}>{favoriteCount}</span>
  );
};