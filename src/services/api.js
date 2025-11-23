// Obtiene la URL base desde el archivo .env
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Función genérica para manejar peticiones HTTP al backend.
 * @param {string} endpoint - La ruta específica de la API (ej: '/productos').
 * @param {string} [method='GET'] - Método HTTP (GET, POST, PUT, PATCH, DELETE).
 * @param {object} [body=null] - Cuerpo de la petición.
 * @param {string} [token=null] - Token de autenticación JWT (actualmente no usado por tu backend).
 */
export const apiCall = async (endpoint, method = 'GET', body = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`; 
  }

  const config = {
    method,
    headers,
    // Adjuntamos el cuerpo solo si existe y no es GET/HEAD
    ...(body && method !== 'GET' && { body: JSON.stringify(body) }), 
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    
    // Si la respuesta es 204 No Content, devolvemos null
    if (response.status === 204) return null;

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      // Manejo de errores 4xx o 5xx (ej: 401 Credenciales inválidas)
      throw new Error(data.message || data.error || data || `Error ${response.status} en la petición.`);
    }
    
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};