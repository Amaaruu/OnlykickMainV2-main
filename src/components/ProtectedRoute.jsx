import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Container, Row, Col } from "react-bootstrap";
import AdminNav from "./organisms/AdminNav.jsx";


// Componente de ruta protegida para administradores
export function ProtectedRouteAdmin() {
    const { user, isAuthenticated } = useAuth();
    // esta autenticado?
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // es admin?
    if (user.rol !== "admin") {
        return <Navigate to="/" replace />;
    }
    // si esta logueado y es admin le damos acceso
    //Si es admin mostramos el layout de admin
    return (
        <Container fluid>
            <Row>
            {/* Columna del Menú Lateral */}
            <Col md={3} lg={2} className="bg-light" style={{ minHeight: 'calc(100vh - 56px)' }}>
                <AdminNav />
            </Col>
            
            {/* Columna del Contenido Principal */}
            <Col md={9} lg={10} className="py-4">
                {/* Aquí se renderiza AdminDashboard, AdminManageProducts, etc. */}
                <Outlet /> 
            </Col>
            </Row>
        </Container>
        );
    }


// este otro componente es para usuarios logueados normales
export function ProtectedRouteUser() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // si esta logueado le damos acceso sea admin o user
    return <Outlet />;
}