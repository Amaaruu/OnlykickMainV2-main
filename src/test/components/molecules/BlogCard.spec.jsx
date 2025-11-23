import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogCard from '../../../../src/components/molecules/BlogCard.jsx';

const mockBlog = {
  id: 1,
  titulo: 'Test Blog',
  contenido: 'Resumen de prueba',
  fecha: '2025-11-23',
  imagen: ''
};

describe('BlogCard', () => {
  it('renderiza título y resumen', () => {
    render(<BlogCard blog={mockBlog} />);
    expect(screen.getByText(/Test Blog/i)).toBeTruthy();
    expect(screen.getByText(/Resumen de prueba/i)).toBeTruthy();
  });
});
