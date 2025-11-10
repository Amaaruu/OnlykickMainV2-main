// src/components/organisms/AdminNav.jsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import NavLink from '../atoms/NavLink.jsx'; // Usamos tu átomo
import '../../styles/organisms/AdminNav.css';

function AdminNav() {

  return (
    <Nav className="flex-column admin-nav">
      <h5 className="px-3">Navegación Admin</h5>
      <NavLink to="/admin">Dashboard</NavLink>
      <NavLink to="/admin/productos">Gestión de Productos</NavLink>
      <NavLink to="/admin/pedidos">Ver Órdenes</NavLink>
    </Nav>
  );
}

export default AdminNav;