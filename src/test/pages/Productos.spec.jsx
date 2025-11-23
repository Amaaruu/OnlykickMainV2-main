import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Products from '../../pages/Products';
import { productos } from '../../data/products';

describe('Página Products', () => {
  let addToCartMock;

  beforeEach(() => {
    // Crea un mock para la función addToCart
    addToCartMock = jasmine.createSpy('addToCartMock');
  });

  it('debería renderizar todos los productos', () => {
    // Renderiza la página Products envuelta en un BrowserRouter para manejar los Links
    const { getByText } = render(
      <BrowserRouter>
        <Products addToCart={addToCartMock} />
      </BrowserRouter>
    );

    // Recorre todos los productos y verifica que su nombre esté en el DOM
    productos.forEach(producto => {
      const productName = getByText(new RegExp(producto.nombre, 'i')); // Búsqueda insensible a mayúsculas/minúsculas
      expect(productName).toBeTruthy();
    });
  });
});
