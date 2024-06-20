import React, { useState, useEffect } from 'react';
import { RiDeleteBin6Line, RiEditLine } from 'react-icons/ri';
import styles from './AdminPage.module.css';
import { CreateProductForm } from '../components/CreateProductForm';
import { EditProductForm } from '../components/EditProductForms';
import { NavbarAd } from '../components/AdminNavbar';
import panaderiaApi from '../../api/panaderiaApi'; // Importa la instancia de API configurada

export const AdminPage = () => {
      // Estado local para almacenar la lista de productos
      const [products, setProducts] = useState([]);
      // Estado local para controlar la visibilidad del formulario de producto
      const [showForm, setShowForm] = useState(false);
      // Estado local para almacenar el ID del producto seleccionado para editar
      const [selectedProductId, setSelectedProductId] = useState(null);
  
      // Efecto para cargar la lista de productos al montar el componente
      useEffect(() => {
          const fetchProducts = async () => {
              try {
                  const response = await panaderiaApi.get('/productos/');
                  setProducts(response.data.productos); // Actualiza el estado con los productos obtenidos del servidor
              } catch (error) {
                  console.error('Error fetching products:', error);
              }
          };
  
          fetchProducts(); // Llama a la función para cargar los productos
      }, []);
  
      // Función para manejar la apertura del formulario para agregar un nuevo producto
      const handleAddProduct = () => {
          setShowForm(true); // Muestra el formulario
          setSelectedProductId(null); // Asegura que no haya ningún producto seleccionado para editar
      };
  
      // Función para manejar la edición de un producto existente
      const handleEditProduct = (productId) => {
          setSelectedProductId(productId); // Establece el ID del producto seleccionado para editar
          setShowForm(true); // Muestra el formulario
      };
  
      // Función para manejar el cierre del formulario de producto
      const handleCloseForm = async () => {
          setShowForm(false); // Oculta el formulario
          setSelectedProductId(null); // Limpia el ID seleccionado cuando se cierra el formulario
  
          // Refrescar la lista de productos después de cerrar el formulario
          try {
              const response = await panaderiaApi.get('/productos/');
              setProducts(response.data.productos); // Actualiza la lista de productos
          } catch (error) {
              console.error('Error fetching products:', error);
          }
      };
  
      // Función para manejar la eliminación de un producto
      const handleDeleteProduct = async (productId) => {
          try {
              await panaderiaApi.delete(`/productos/borrarproducto/${productId}`); // Llama a la API para eliminar el producto
  
              // Actualiza el estado local eliminando el producto eliminado de la lista
              setProducts((prevProducts) => {
                  return prevProducts.filter(product => product._id !== productId);
              });
          } catch (error) {
              console.error('Error deleting product:', error);
          }
      };
    return (
        <>
            <NavbarAd />
            <div className={styles['admin-page']}>
                <h2>Productos</h2>
                <div className={styles['button-container']}>
                    <button className={styles['add-button']} onClick={handleAddProduct}>+ Agregar Producto</button>
                </div>
                {showForm && (
                    selectedProductId ? (
                        <EditProductForm
                            productId={selectedProductId}
                            onClose={handleCloseForm}
                            setProducts={setProducts}
                        />
                    ) : (
                        <CreateProductForm onClose={handleCloseForm} setProducts={setProducts} />
                    )
                )}
                <div className={styles['table-container']}>
                    <table>
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Stock</th>
                                <th>Precio</th>
                                <th className={styles['actions-cell']}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index} className={styles['product-row']}>
                                    <td><img src={product.imagen} alt={product.nombre_producto} /></td>
                                    <td>{product.nombre_producto}</td>
                                    <td>{product.cantidad_stock}</td>
                                    <td>{product.precio}</td>
                                    <td>
                                        <button onClick={() => handleEditProduct(product._id)}><RiEditLine /></button>
                                        <button onClick={() => handleDeleteProduct(product._id)}><RiDeleteBin6Line /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};