// Obtiene la URL base desde el archivo .env
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Función genérica para manejar peticiones HTTP al backend.
 * @param {string} endpoint - La ruta específica de la API (ej: '/productos').
 * @param {string} [method='GET'] - Método HTTP (GET, POST, PUT, PATCH, DELETE).
 * @param {object} [body=null] - Cuerpo de la petición.
 * @param {string} [token=null] - Token opcional (si no se pasa, intenta leerlo del localStorage).
 */
export const apiCall = async (endpoint, method = 'GET', body = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // 1. Buscamos el token: O viene por parámetro, o lo sacamos del localStorage
  const authToken = token || localStorage.getItem('token');

  // 2. Si existe, lo agregamos al Header Authorization
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`; 
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

    // Si la sesión expiró (403 o 401), podríamos limpiar el token automáticamente (opcional)
    if (response.status === 401 || response.status === 403) {
       console.warn("Acceso denegado o sesión expirada");
       // Opcional: localStorage.removeItem('token'); 
       // Opcional: window.location.href = '/login';
    }

    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      console.warn("la respuesta no es JSON:", text);
      data = { message: text, error: text };
    }

    if (!response.ok) {
      throw new Error(data.message || data.error || `Error ${response.status}: ${JSON.stringify(data)}`);
    }
    
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};