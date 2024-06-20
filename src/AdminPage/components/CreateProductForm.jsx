import React, { useState } from 'react';
import panaderiaApi from '../../api/panaderiaApi'; // Importa la instancia de API configurada
import styles from './CreateProductForm.module.css'; // Importa los estilos CSS del formulario

export const CreateProductForm = ({ onClose, setProducts }) => {
    // Estado para almacenar los datos del formulario
    const [formData, setFormData] = useState({
        nombre_producto: '',
        imagen: '',
        descripcion_corta: '',
        descripcion_larga: '',
        cantidad_stock: '',
        precio: ''
    });

    // Función para manejar cambios en los inputs del formulario
    const handleChange = (e) => {
        // Actualiza el estado del formulario con los nuevos valores del input
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Función para manejar el envío del formulario (crear un nuevo producto)
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        try {
            // Llama a la API para crear un nuevo producto con los datos del formulario
            const response = await panaderiaApi.post('/productos/crearproducto', formData);

            console.log('Product created:', response.data); // Log de la respuesta de la API
            // Actualiza el estado de productos con el nuevo producto creado
            setProducts((prevProducts) => [...prevProducts, response.data]);
            onClose(); // Cierra el formulario después de enviar los datos

        } catch (error) {
            console.error('Error creating product:', error); // Maneja los errores de la solicitud
        }
    };

    // Función para manejar el clic fuera del formulario para cerrarlo
    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose(); // Cierra el formulario si se hace clic fuera del área del formulario
        }
    };

   
    return (
        <div className={styles['form-container']} onClick={handleOutsideClick}>
            <div className={styles['form']}>
                <h3 className={styles['form-title']}>Crear Nuevo Producto</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nombre_producto">Nombre:</label>
                    <input type="text" id="nombre_producto" name="nombre_producto" value={formData.nombre_producto} onChange={handleChange} required />
                    <label htmlFor="imagen">Imagen URL:</label>
                    <input type="text" id="imagen" name="imagen" value={formData.imagen} onChange={handleChange} required />
                    <label htmlFor="descripcion_corta">Descripción Corta:</label>
                    <textarea id="descripcion_corta" name="descripcion_corta" value={formData.descripcion_corta} onChange={handleChange} required />
                    <label htmlFor="descripcion_larga">Descripción Larga:</label>
                    <textarea id="descripcion_larga" name="descripcion_larga" value={formData.descripcion_larga} onChange={handleChange} required />
                    <label htmlFor="cantidad_stock">Cantidad en Stock:</label>
                    <input type="number" id="cantidad_stock" name="cantidad_stock" value={formData.cantidad_stock} onChange={handleChange} required />
                    <label htmlFor="precio">Precio:</label>
                    <input type="number" id="precio" name="precio" value={formData.precio} onChange={handleChange} required />
                    <div className={styles['button-container']}>
                        <button type="submit" className={styles['submit-button']}>Crear Producto</button> {/* Botón para crear un nuevo producto */}
                        <button type="button" onClick={onClose} className={styles['cancel-button']}>Cancelar</button> {/* Botón para cancelar y cerrar el formulario */}
                    </div>
                </form>
            </div>
        </div>
    );
};