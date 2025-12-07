/**
 * Adapta el objeto Producto del Backend (Java) al formato simple esperado por el Frontend (React).
 * @param {object} productoBackend - Objeto Producto recibido del Spring Boot API.
 */
export const adaptarProducto = (productoBackend) => {
  const imagenPrincipal = 
    productoBackend.imagenes && Array.isArray(productoBackend.imagenes) && productoBackend.imagenes.length > 0 
      ? productoBackend.imagenes[0].urlImagen 
      : '/img/zapatilla-default.webp';

  return {
    id: productoBackend.idProducto,          
    nombre: productoBackend.nombreProducto,  
    precio: productoBackend.precioBase,      
    descripcion: productoBackend.descripcion,
    imagen: imagenPrincipal,                 
    // --- NUEVOS CAMPOS PARA LA TARJETA ---
    marca: productoBackend.marca ? productoBackend.marca.nombreMarca : 'OnlyKick',
    categoria: productoBackend.categoria ? productoBackend.categoria.nombreCategoria : 'Calzado'
  };
};