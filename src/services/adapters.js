/**
 * Adapta el objeto Producto del Backend (Java) al formato simple esperado por el Frontend (React).
 * @param {object} productoBackend - Objeto Producto recibido del Spring Boot API.
 */
export const adaptarProducto = (productoBackend) => {
  // Nota: Tu backend devuelve un array de objetos 'Imagen'. 
  // Tomamos la URL del primer objeto Imagen, o usamos una por defecto.
  const imagenPrincipal = 
    productoBackend.imagenes && Array.isArray(productoBackend.imagenes) && productoBackend.imagenes.length > 0 
      ? productoBackend.imagenes[0].urlImagen 
      : '/img/zapatilla-default.webp'; // Imagen por defecto si no hay

  return {
    id: productoBackend.idProducto,          // Mapea idProducto a id
    nombre: productoBackend.nombreProducto,  // Mapea nombreProducto a nombre
    // BigDecimal de Java se maneja como String/Number en JS
    precio: productoBackend.precioBase,      // Mapea precioBase a precio 
    descripcion: productoBackend.descripcion,
    imagen: imagenPrincipal,                 // Mapea el array a una sola URL
  };
};