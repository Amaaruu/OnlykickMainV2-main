import React, { createContext, useState, useContext, useEffect} from "react";
// Importamos el nuevo servicio API
import { apiCall } from "../services/api"; 

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    // Mantenemos 'token' pero el backend de Java solo devuelve 'user'
    const [token, setToken] = useState(() => localStorage.getItem("token") || null); 

    useEffect(() => {
        const userStored = localStorage.getItem('user');
        if (userStored) {
            setUser(JSON.parse(userStored));
        }
    }, []);

    const login = async (email, password) => {
        const body = { 
            email: email, 
            // Mapeamos 'password' a 'passwordHash'
            passwordHash: password 
        };

        try {
            // Llama al endpoint POST /usuarios/login
            const usuarioBackend = await apiCall('/usuarios/login', 'POST', body);
            
            if (usuarioBackend) {
                // Guarda el objeto usuario retornado por Spring Boot
                setUser(usuarioBackend);
                localStorage.setItem('user', JSON.stringify(usuarioBackend));
                
                // Nota: Si implementas JWT, aquí actualizarías el token.
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login error:", error);
            throw error; 
        }
    };

    const registerUser = async (userData) => {
        const body = {
            // Mapeamos 'nombre' a 'nombreUsuario'
            nombreUsuario: userData.nombre, 
            email: userData.email,
            passwordHash: userData.password // Mapeamos password a passwordHash
        };

        try {
            // Llama al endpoint POST /usuarios/registro
            await apiCall('/usuarios/registro', 'POST', body);
            return true;
        } catch (error) {
            console.error("Registro error:", error);
            throw error;
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    }

    const value = {
        user,
        token, 
        login,
        registerUser,
        logout,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}