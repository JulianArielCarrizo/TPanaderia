import React, { useEffect, useState } from 'react';
import styles from './OrdersPage.module.css'; // Importar estilos desde un módulo CSS
import { Navbar } from '../components/UserNavbar';
import { FaCheck } from 'react-icons/fa'; // Importar ícono de tilde
import { MenuIcon } from '../components/MenuIcon'; // Importar el componente MenuIcon

export const OrdersPage = () => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [orderCount, setOrderCount] = useState(0); // Estado para el contador de pedidos
    const [showDashboard, setShowDashboard] = useState(false); // Estado para controlar la visibilidad del dashboard

    useEffect(() => {
        const storedOrderDetails = localStorage.getItem('orderDetails');
        if (storedOrderDetails) {
            setOrderDetails(JSON.parse(storedOrderDetails));
        }
    }, []);

    // Generar un número de pedido único
    const generateOrderNumber = () => {
        return orderCount + 1; // Incrementar el contador de pedidos en 1
    };

    // Obtener la fecha actual en formato dd/mm/yyyy
    const getCurrentDate = () => {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Manejar el registro de un nuevo pedido y actualizar el contador
    const handleNewOrder = () => {
        setOrderCount(orderCount + 1); // Incrementar el contador de pedidos
    };

    const toggleDashboard = () => {
        setShowDashboard(prevShowDashboard => !prevShowDashboard);
    };

    return (
        <>
            <Navbar isActive={!showDashboard} toggleMenu={toggleDashboard} /> {/* Navbar con menú hamburguesa */}
            <div className={`${styles.container} ${showDashboard ? '' : styles.dashboardClosed}`}>
                <div className={styles.dashboardHeader}>
                    <div className={styles.sideTitleContainer}>
                        <h2 className={styles.sideTitle}>Panadería Pepito</h2>
                    </div>
                    <div className={styles.dashboardToggle}>
                        <MenuIcon active={!showDashboard} toggleMenu={toggleDashboard} />
                    </div>
                </div>
                <h2 className={styles.heading}>Historial de Pedidos</h2>
                {orderDetails ? (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>N° Pedido</th>
                                <th>Productos</th>
                                <th>Total</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{generateOrderNumber()}</td>
                                <td>
                                    {orderDetails.items.map((item, index) => (
                                        <div key={index} className={styles.productItem}>
                                            {item.name} - Cantidad: {item.quantity}
                                        </div>
                                    ))}
                                </td>
                                <td>${orderDetails.total}</td>
                                <td>{getCurrentDate()}</td>
                                <td className={styles.statusCell}><FaCheck className={styles.statusIcon}/></td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>No hay detalles del pedido disponibles.</p>
                )}
            </div>
            <div className={styles['mobile-menu-icon']}>
                <MenuIcon active={!showDashboard} toggleMenu={toggleDashboard} />
            </div>
        </>
    );
};