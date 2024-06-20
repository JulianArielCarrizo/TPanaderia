import React from 'react';
import { Link } from "react-router-dom";
import styles from './HomeCard.module.css'; // Importa los estilos CSS del módulo

export const HomeCard = ({ title, description, link }) => {
  return (
    <Link to={link} className={styles.cardLink}>
    <div className={styles.card}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  </Link>
);
};
