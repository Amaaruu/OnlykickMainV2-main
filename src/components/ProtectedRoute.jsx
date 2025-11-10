import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";


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
    return <Outlet />;
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