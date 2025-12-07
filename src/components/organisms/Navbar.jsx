import React from 'react';
import { Container, Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../atoms/Logo.jsx';
import NavLink from '../atoms/NavLink.jsx';
import Button from '../atoms/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx'; 
import { useCart } from '../../context/CartContext.jsx'; 

function NavBar() { 
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount, clearCart } = useCart(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    clearCart(); 
    navigate('/login');
  };

  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm">
      <Container fluid>
        <Logo />
        <BootstrapNavbar.Toggle aria-controls="main-navbar-nav" />
        <BootstrapNavbar.Collapse id="main-navbar-nav">
          
          <Nav className="mx-auto">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/productos">Productos</NavLink>
            <NavLink to="/nosotros">Nosotros</NavLink>
            <NavLink to="/blogs">Blogs</NavLink>
            <NavLink to="/contacto">Contacto</NavLink>

            {isAuthenticated && user.rol === 'admin' && (
              <NavLink to="/admin">Panel Admin</NavLink>
            )}
          </Nav>

          <Nav className="align-items-center">
            {isAuthenticated ? (
              <>
                {/* CAMBIO AQUÍ: user.nombre en lugar de user.nombreUsuario */}
                <span className="me-3 mb-2 mb-lg-0 fw-bold text-nowrap">
                  Hola, {user.nombre || user.nombreUsuario} 
                </span>
                
                <Link to="/mis-compras" className="text-decoration-none">
                    <Button 
                        variant="dark" 
                        className="btn-sm me-2 mb-2 mb-lg-0"
                    >
                        📦 Mis Compras
                    </Button>
                </Link>

                <Button 
                  variant="dark" 
                  className="btn-sm me-2 mb-2 mb-lg-0" 
                  onClick={handleLogout} 
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-decoration-none">
                    <Button variant="outline-danger" className="btn-sm me-2 mb-2 mb-lg-0">
                        Iniciar Sesión
                    </Button>
                </Link>
                <Link to="/registro" className="text-decoration-none">
                    <Button variant="outline-danger" className="btn-sm me-2 mb-2 mb-lg-0">
                        Registrar
                    </Button>
                </Link>
              </>
            )}
            
            <Link to="/carrito" style={{ textDecoration: 'none' }}>
              <Button 
                  variant="dark" 
                  className="btn-sm d-flex align-items-center gap-1 mb-2 mb-lg-0"
              >
                  <span>🛒</span> Carrito ({cartCount})
              </Button>
            </Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default NavBar;