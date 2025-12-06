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
    setCartItems(prevItems => [...prevItems, product]);
    alert(`"${product.nombre}" fue añadido al carrito.`);
  };

  const removeFromCart = (productId) => {
    // Nota: Si tienes productos repetidos con el mismo ID, esto borrará todos.
    // Lo ideal sería filtrar por un ID único de instancia o índice, pero mantenemos tu lógica actual.
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  // Valores que se compartirán
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    cartCount: cartItems.length,
    // Calculamos el total aquí para facilitar su uso
    cartTotal: cartItems.reduce((sum, item) => sum + item.precio, 0) 
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook personalizado para usar el carrito fácilmente
export function useCart() {
  return useContext(CartContext);
}