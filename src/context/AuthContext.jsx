import React, { createContext, useState, useContext, useEffect} from "react";
import { data } from "react-router-dom";
// importamos el servicio de usuario

// 2. Creamos el contexto
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem("token") || null);

    useEffect(() => {
    // Si hay un token, podrías validar si sigue vigente
    // y cargar los datos del usuario.
    // Por ahora, solo guardamos el token en localStorage.
    if (token) {
      localStorage.setItem('token', token);
      // Aquí deberías decodificar el token o hacer una llamada a /me
      // para obtener los datos del usuario y su rol.
      // Ejemplo (simplificado):
      // const decodedUser = jwt_decode(token); 
      // setUser(decodedUser);
    } else {
      localStorage.removeItem('token');
    }
    }, [token]);

    const login = async (email, password) => {

        const response = {
            data: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
                user: {
                    name: "Admin Principal",
                    email: email,
                    rol: "admin"
                }
            }
        }

    }

    const logout = () => {
        setUser(null);
        setToken(null);
    }

    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}

// 3. Creamos un hook para usar el contexto
export function useAuth() {
    return useContext(AuthContext);
}