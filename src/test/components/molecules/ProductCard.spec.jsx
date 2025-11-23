import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from '../../../../src/components/molecules/ProductCard.jsx';
import { BrowserRouter } from 'react-router-dom';

const mockProduct = { id: 1, nombre: 'Zapa', precio: 150, imagen: null };

describe('ProductCard', () => {
  it('muestra nombre y botón de añadir', () => {
    const addToCart = jasmine.createSpy('addToCart');
    render(<BrowserRouter><ProductCard producto={mockProduct} addToCart={addToCart} /></BrowserRouter>);
    expect(screen.getByText(/Zapa/i)).toBeTruthy();
    expect(screen.getByText(/Añadir al Carrito/i)).toBeTruthy();
  });
});
