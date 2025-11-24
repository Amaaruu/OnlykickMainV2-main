import React from 'react';
import { Container, Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import { Button as BootstrapButton } from 'react-bootstrap'; 
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../atoms/Logo.jsx';
import NavLink from '../atoms/NavLink.jsx';
import Button from '../atoms/Button.jsx';
import { useAuth } from '../../context/AuthContext'; 

// Recibimos 'onLogout' desde App.jsx
function NavBar({ cartItemCount, onLogout }) { 
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Función que combina cerrar sesión y limpiar carrito
  const handleLogout = () => {
    logout();           // Borra el usuario del contexto/localStorage
    if (onLogout) {
        onLogout();     // Borra los items del carrito visualmente
    }
    navigate('/login'); // Redirige al login
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
                <span className="me-2 mb-2 mb-lg-0">Hola, {user.nombreUsuario}</span>
                <BootstrapButton 
                  variant="outline-secondary" 
                  onClick={handleLogout} 
                  className="me-2 mb-2 mb-lg-0"
                >
                  Cerrar Sesión
                </BootstrapButton>
              </>
            ) : (
              <>
                <BootstrapButton as={Link} to="/login" variant="outline-danger" className="me-2 mb-2 mb-lg-0">
                  Iniciar Sesión
                </BootstrapButton>
                <BootstrapButton as={Link} to="/registro" variant="outline-danger" className="me-2 mb-2 mb-lg-0">
                  Registrar
                </BootstrapButton>
              </>
            )}
            
            <Link to="/carrito" style={{ textDecoration: 'none' }}>
              <Button>
                  🛒 Carrito ({cartItemCount})
              </Button>
            </Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default NavBar;