import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import '../../styles/atoms/NavLink.css';

// Su funcion es renderizar un enlace de navegacion con estilos atomicos
function NavLink({ to, children }) {
    return (
        <RouterNavLink to={to} className="nav-link-atom">
            {children}
        </RouterNavLink>
    );
}

export default NavLink;