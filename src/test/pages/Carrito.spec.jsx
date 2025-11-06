import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Carrito from '../../pages/Carrito.jsx';

describe('Pruebas para la Página: Carrito', () => {

  const mockRemoveFromCart = jasmine.createSpy('removeFromCart');

  //Pruebas para cuando el carrito está vacío.
  describe('Cuando el carrito está vacío', () => {
    it('debería mostrar un mensaje de que el carrito está vacío', () => {
      render(
        <MemoryRouter>
          <Carrito cartItems={[]} removeFromCart={mockRemoveFromCart} />
        </MemoryRouter>
      );

      //verifica que el elemento fue encontrado.
      const emptyMessage = screen.getByText(/Tu carrito de compras está vacío/i);
      expect(emptyMessage).toBeTruthy();
    });
  });

  //Pruebas para cuando el carrito tiene productos.
  describe('Cuando el carrito tiene productos', () => {
    const mockItems = [
      { id: 1, nombre: 'Nike Air Force 1 "Low"', precio: 89990, imagen: 'img1.webp' },
      { id: 2, nombre: 'Nike M2K Tekno', precio: 99990, imagen: 'img2.webp' }
    ];

    it('debería mostrar la tabla de productos', () => {
      render(
        <MemoryRouter>
          <Carrito cartItems={mockItems} removeFromCart={mockRemoveFromCart} />
        </MemoryRouter>
      );
      
      // Verifica que los nombres de los productos existen.
      expect(screen.getByText('Nike Air Force 1 "Low"')).toBeTruthy();
      expect(screen.getByText('Nike M2K Tekno')).toBeTruthy();
    });

    it('debería calcular y mostrar el subtotal correcto', () => {
        render(
          <MemoryRouter>
            <Carrito cartItems={mockItems} removeFromCart={mockRemoveFromCart} />
          </MemoryRouter>
        );
        
        const expectedSubtotal = (89990 + 99990).toLocaleString('es-CL');
        
        // 
        // Esto nos devuelve un array con los dos elementos.
        const subtotalElements = screen.getAllByText(`$${expectedSubtotal}`);
        
        // Verifica que se hayan encontrado al menos uno de los elementos.
        expect(subtotalElements.length).toBeGreaterThan(0);
      });
  });
});