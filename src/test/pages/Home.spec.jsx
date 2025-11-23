import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home'; 
import { productos } from '../../data/products'; 

describe('Página Home', () => {
  let addToCartMock;

  beforeEach(() => {
    addToCartMock = jasmine.createSpy('addToCartMock');
  });

  it('debería renderizar el título del banner principal', () => {
    const { getByText } = render(
      <BrowserRouter> {}
        <Home addToCart={addToCartMock} />
      </BrowserRouter>
    );
    const bannerTitle = getByText('EL OUTFIT EMPIEZA EN LOS PIES.');
    expect(bannerTitle).toBeTruthy();
  });

  it('debería renderizar el botón con el texto correcto', () => {
    const { getByText } = render(
      <BrowserRouter> {}
        <Home addToCart={addToCartMock} />
      </BrowserRouter>
    );
    const button = getByText('Comprar Ahora');
    expect(button).toBeTruthy();
  });

  it('debería renderizar los productos destacados', () => {
    const { getByText } = render(
      <BrowserRouter> {}
        <Home addToCart={addToCartMock} />
      </BrowserRouter>
    );
    productos.slice(0, 4).forEach(producto => {
      const productName = getByText(producto.nombre);
      expect(productName).toBeTruthy();
    });
  });
});
