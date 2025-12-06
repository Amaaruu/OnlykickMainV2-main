import React, { createContext, useState, useContext, useEffect} from "react";
import { apiCall } from "../services/api"; 

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem("token") || null); 

    useEffect(() => {
        // Al cargar la app, intentamos recuperar el usuario del localStorage
        const userStored = localStorage.getItem('user');
        const tokenStored = localStorage.getItem('token');
        
        if (userStored && tokenStored) {
            setUser(JSON.parse(userStored));
            setToken(tokenStored);
        }
    }, []);

    const login = async (email, password) => {
        const body = { 
            email: email, 
            passwordHash: password 
        };

        try {
            // El backend ahora devuelve: { token: "...", user: { idUsuario: 1, rol: "admin", ... } }
            const response = await apiCall('/usuarios/login', 'POST', body);
            
            if (response && response.token && response.user) {
                // 1. Guardamos el Token
                localStorage.setItem("token", response.token);
                setToken(response.token);

                // 2. Guardamos el Usuario
                setUser(response.user);
                localStorage.setItem('user', JSON.stringify(response.user));
                
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
            nombreUsuario: userData.nombre, 
            email: userData.email,
            passwordHash: userData.password
        };

        try {
            await apiCall('/usuarios/registro', 'POST', body);
            return true;
        } catch (error) {
            console.error("Registro error:", error);
            throw error;
        }
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    const value = {
        user,
        token, 
        login,
        registerUser,
        logout,
        isAuthenticated: !!user // Es true si 'user' tiene datos
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}