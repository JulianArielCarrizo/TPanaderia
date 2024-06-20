import { useEffect } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { useAuthStore } from '../hooks';

import { ClientPage } from '../ClientPage/pages/ClientPage';
import { ProductDetails } from '../ClientPage/pages/ProductDetalis';
import { AdminPage } from '../AdminPage/pages/AdminPage';
import { LoginAction } from '../home/components/LoginAction'; 
import { AdminLoginAction } from '../adminlogin/components/AdminLoginAction';

import { CartPage } from '../ClientPage/pages/CartPage';
import { FavoritePage} from '../ClientPage/pages/FavoritePage'
import { HomePage } from '../home/page/HomePage';
import { RegisterPage } from '../home/page/RegisterPage';
import { ContactPage} from '../home/page/ContactPage'
import { OrdersPage } from '../ClientPage/pages/OrdersPage';
import { HomeProductDetails } from '../home/page/HomeProductDetails';
import { AboutPage } from '../home/page/AboutPage'; 
import { ProtectedRoute } from '../ClientPage/components/ProtectedRoute';
import { AdminRoute } from '../adminlogin/components/AdminRoute';




export const AppRouter = () => {
  

  const { status, checkAuthToken, user } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return <h3>Cargando...</h3>;
  }
  return (
    
    <Routes>
      
    
    {/* Users routes */}
    <Route
          path="/userdashboard/productos"
          element={
            <ProtectedRoute
              element={<ClientPage />}
              redirectTo="/login"
            />}
          />
      <Route
          path="/userdashboard/productos/productos-detalles/:id"
          element={
            <ProtectedRoute
              element={<ProductDetails />}
              redirectTo="/login"
            />
          }
        />
        <Route
          path="/userdashboard/carrito"
          element={
            <ProtectedRoute
              element={<CartPage />}
              redirectTo="/login"
            />
          }
        />
        <Route
          path="/userdashboard/favoritos"
          element={
            <ProtectedRoute
              element={<FavoritePage />}
              redirectTo="/login"
            />
          }
        />
        <Route
          path="/userdashboard/orders"
          element={
            <ProtectedRoute
              element={<OrdersPage />}
              redirectTo="/login"
            />
          }
        />

        {/* Admin route */}
        <Route
          path="/admindashboard/crud"
          element={
            <AdminRoute
              element={<AdminPage />}
              redirectTo="/login"
            />
          }
        />
    
        {/* Public routes */}

      <Route path="/admin" element={<AdminLoginAction />} />
      <Route path="/login" element={<LoginAction />} />
      <Route path="/*" element={<HomePage/>} />
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/contact' element= {<ContactPage/>}/>
      <Route path='/about' element= {<AboutPage/>}/>
      <Route path="/pub/productos/productos-detalles/:id" element={<HomeProductDetails />} />
   
</Routes>
    
);
}

    
    

    
    
 
 
   
      
      
    
