import React from 'react';
import styles from './Avatar.module.css'; // Importa el módulo CSS para el avatar

export const Avatar = ({ name }) => {
  // Función para obtener las iniciales del nombre
  const getInitials = (name) => {
    const nameArray = name.split(' '); // Divide el nombre en un array por espacios
    const initials = nameArray.map(n => n[0]).join(''); // Obtiene la primera letra de cada palabra y las une
    return initials.toUpperCase(); // Devuelve las iniciales en mayúsculas
  };

  // Renderiza el componente Avatar con las iniciales del nombre
  return (
    <div className={styles.avatar}> {/* Renderiza el avatar con el estilo CSS definido */}
      {getInitials(name)} {/* Muestra las iniciales del nombre dentro del avatar */}
    </div>
  );
};