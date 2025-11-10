import React from 'react';
import { Container, Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import { Button as BootstrapButton } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import Logo from '../atoms/Logo.jsx';
import NavLink from '../atoms/NavLink.jsx';
import Button from '../atoms/Button.jsx';
import { useAuth } from '../../context/AuthContext'; // <--- 1. IMPORTAR EL HOOK

// su funcion es un navbar
// que contiene enlaces de navegacion y botones de login y registro
function NavBar({ cartItemCount }) { 
  // 2. OBTENER EL ESTADO DE AUTENTICACIÓN Y DATOS DEL USUARIO
  const { user, isAuthenticated, logout } = useAuth();

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

            {/* 3. ENLACE CONDICIONAL PARA EL ADMIN */}
            {isAuthenticated && user.rol === 'admin' && (
              <NavLink to="/admin">Panel Admin</NavLink>
            )}
          </Nav>

          <Nav className="align-items-center">
            {/* 4. LÓGICA CONDICIONAL PARA BOTONES DE LOGIN/LOGOUT */}
            {isAuthenticated ? (
              // Si está logueado
              <>
                {/* Saludamos al usuario */}
                <span className="me-2 mb-2 mb-lg-0">Hola, {user.nombre}</span>
                <BootstrapButton 
                  variant="outline-secondary" 
                  onClick={logout} 
                  className="me-2 mb-2 mb-lg-0"
                >
                  Cerrar Sesión
                </BootstrapButton>
              </>
            ) : (
              // Si NO está logueado
              <>
                <BootstrapButton as={Link} to="/login" variant="outline-danger" className="me-2 mb-2 mb-lg-0">
                  Iniciar Sesión
                </BootstrapButton>
                <BootstrapButton as={Link} to="/registro" variant="outline-danger" className="me-2 mb-2 mb-lg-0">
                  Registrar
                </BootstrapButton>
              </>
            )}
            
            {/* El botón del carrito se mantiene igual */}
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