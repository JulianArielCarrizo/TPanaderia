import React, { useState, useEffect } from 'react';
import panaderiaApi from '../../api/panaderiaApi'; // Importa la instancia de API configurada
import styles from './EditProductForm.module.css'; // Importa los estilos del módulo CSS

export const EditProductForm = ({ onClose, productId, setProducts }) => {
    // Estado para almacenar los datos del formulario
    const [formData, setFormData] = useState({
        nombre_producto: '',
        imagen: '',
        descripcion_corta: '',
        descripcion_larga: '',
        cantidad_stock: '',
        precio: ''
    });

    // Efecto para obtener los datos del producto a editar
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Llama a la API para obtener los detalles del producto específico
                const response = await panaderiaApi.get(`/productos/${productId}`);
                const productData = response.data.producto; // Accede a los datos del producto desde la respuesta

                // Establece los datos del producto en el estado del formulario
                setFormData({
                    nombre_producto: productData.nombre_producto || '', // Asigna el nombre del producto
                    imagen: productData.imagen || '', // Asigna la URL de la imagen del producto
                    descripcion_corta: productData.descripcion_corta || '', // Asigna la descripción corta del producto
                    descripcion_larga: productData.descripcion_larga || '', // Asigna la descripción larga del producto
                    cantidad_stock: productData.cantidad_stock || '', // Asigna la cantidad en stock del producto
                    precio: productData.precio || '' // Asigna el precio del producto
                });

                // Log para verificar que formData se está estableciendo correctamente
                console.log('Form data set:', {
                    nombre_producto: productData.nombre_producto || '',
                    imagen: productData.imagen || '',
                    descripcion_corta: productData.descripcion_corta || '',
                    descripcion_larga: productData.descripcion_larga || '',
                    cantidad_stock: productData.cantidad_stock || '',
                    precio: productData.precio || ''
                });

            } catch (error) {
                console.error('Error fetching product:', error); // Maneja los errores de la solicitud
            }
        };

        fetchProduct(); // Llama a la función para obtener los datos del producto al montar el componente
    }, [productId]); // Se ejecuta cada vez que cambia productId

    // Función para manejar cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Actualiza el estado del formulario con los nuevos valores
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    // Función para manejar el envío del formulario (actualización del producto)
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        try {
            // Llama a la API para actualizar el producto con los datos del formulario
            const response = await panaderiaApi.put(`/productos/actualizarproducto/${productId}`, formData);

            console.log('Product updated:', response.data); // Log de la respuesta de la API
            // Actualiza el estado de productos con el producto actualizado
            setProducts(prevProducts => {
                return prevProducts.map(product => {
                    if (product._id === productId) {
                        return response.data; // Reemplaza el producto actual con el producto actualizado
                    }
                    return product; // Devuelve los otros productos sin cambios
                });
            });
            onClose(); // Cierra el formulario después de la actualización exitosa

        } catch (error) {
            console.error('Error updating product:', error); // Maneja los errores de la solicitud
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
                <h3 className={styles['form-name']}>Editar Producto</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre_producto"
                        value={formData.nombre_producto}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="imagen">Imagen URL:</label>
                    <input
                        type="text"
                        id="imagen"
                        name="imagen"
                        value={formData.imagen}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="descripcionCorta">Descripción Corta:</label>
                    <textarea
                        id="descripcionCorta"
                        name="descripcion_corta"
                        value={formData.descripcion_corta}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="descripcionLarga">Descripción Larga:</label>
                    <textarea
                        id="descripcionLarga"
                        name="descripcion_larga"
                        value={formData.descripcion_larga}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="cantidadStock">Cantidad en Stock:</label>
                    <input
                        type="number"
                        id="cantidadStock"
                        name="cantidad_stock"
                        value={formData.cantidad_stock}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="precio">Precio:</label>
                    <input
                        type="number"
                        id="precio"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                        required
                    />
                    <div className={styles['button-container']}>
                        <button type="submit" className={styles['submit-button']}>Actualizar Producto</button> {/* Botón para actualizar el producto */}
                        <button type="button" onClick={onClose} className={styles['cancel-button']}>Cancelar</button> {/* Botón para cancelar y cerrar el formulario */}
                    </div>
                </form>
            </div>
        </div>
    );
};