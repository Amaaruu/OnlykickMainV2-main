import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. Inicializar estado desde localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Error al leer el carrito:", error);
      return [];
    }
  });

  // 2. Guardar en localStorage cada vez que cambie el carrito
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // 3. Funciones del carrito

  const addToCart = (product) => {
    // Generamos un ID único para este ítem específico en el carrito.
    // Usamos crypto.randomUUID() si está disponible, o un fallback con Date.now().
    const uniqueId = window.crypto && window.crypto.randomUUID 
        ? crypto.randomUUID() 
        : Date.now() + Math.random().toString();

    // Creamos el nuevo objeto para el carrito, preservando los datos del producto
    // pero agregando nuestro identificador único para la gestión visual.
    const newCartItem = {
        ...product,
        cartItemId: uniqueId 
    };

    setCartItems(prevItems => [...prevItems, newCartItem]);
    alert(`"${product.nombre}" fue añadido al carrito.`);
  };

  const removeFromCart = (uniqueId) => {
    // Aquí está la corrección: Filtramos por el cartItemId, no por el ID del producto.
    // Así solo se borra la línea específica que el usuario clicó.
    setCartItems(prevItems => prevItems.filter(item => item.cartItemId !== uniqueId));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  // Valores que se compartirán en toda la app
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    cartCount: cartItems.length,
    // Calculamos el total sumando los precios
    cartTotal: cartItems.reduce((sum, item) => sum + item.precio, 0) 
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook personalizado para usar el carrito fácilmente
export function useCart() {
  return useContext(CartContext);
}