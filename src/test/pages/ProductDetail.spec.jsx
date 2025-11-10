import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProductDetail from '../../pages/ProductDetail'; 
import '@testing-library/jasmine-dom';

describe('Pruebas para la Página: ProductDetail', () => {

  const mockAddToCart = jasmine.createSpy('addToCart');

  it('debería mostrar "Producto no encontrado" si el ID no existe', () => {
    // Renderizamos el componente en una ruta que no existe (ID 999)
    render(
      <MemoryRouter initialEntries={['/producto/999']}>
        <Routes>
          <Route path="/producto/:id" element={<ProductDetail addToCart={mockAddToCart} />} />
        </Routes>
      </MemoryRouter>
    );

    // Verificamos que se muestre el mensaje de alerta
    expect(screen.getByText(/Producto no encontrado/i)).toBeTruthy();
  });

  it('debería mostrar los detalles de un producto existente', () => {
    // Renderizamos el componente en una ruta que SÍ existe (ID 1)
    render(
      <MemoryRouter initialEntries={['/producto/1']}>
        <Routes>
          <Route path="/producto/:id" element={<ProductDetail addToCart={mockAddToCart} />} />
        </Routes>
      </MemoryRouter>
    );

    // Verificamos que muestre el nombre del producto 1
    // (Según tu data/products.js)
    expect(screen.getByText('Nike Air Force 1 "Low"')).toBeTruthy();
    
    // Verificamos que muestre el precio
    expect(screen.getByText('$89.990')).toBeTruthy();
  });

});