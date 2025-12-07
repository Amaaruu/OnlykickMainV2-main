import { Routes, Route } from 'react-router-dom';
import NavBar from './components/organisms/Navbar';
import Footer from './components/organisms/Footer'; 
import Home from './pages/Home';
import Products from './pages/Products'; 
import Carrito from './pages/Carrito.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Blogs from './pages/Blogs.jsx';
import Contacto from './pages/Contacto.jsx';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import { ProtectedRouteAdmin, ProtectedRouteUser } from './components/ProtectedRoute.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminManageProducts from './pages/admin/AdminManageProducts.jsx';
import AdminViewOrders from './pages/admin/AdminViewOrders.jsx';
import { CartProvider } from './context/CartContext.jsx'; 
import MisCompras from './pages/MisCompras.jsx'; 



function App() {
  return (
    <CartProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavBar />
        
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/productos/:id" element={<ProductDetail />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            
            <Route path="/carrito" element={<Carrito />} />

            {/* --- RUTAS PROTEGIDAS DE USUARIO --- */}
            <Route element={<ProtectedRouteUser />}>
               <Route path="/mis-compras" element={<MisCompras />} />
            </Route>

            {/* --- RUTAS PROTEGIDAS DE ADMIN --- */}
            <Route path="/admin" element={<ProtectedRouteAdmin />}>
              <Route index element={<AdminDashboard />} /> 
              <Route path="productos" element={<AdminManageProducts />} /> 
              <Route path="pedidos" element={<AdminViewOrders />} /> 
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;