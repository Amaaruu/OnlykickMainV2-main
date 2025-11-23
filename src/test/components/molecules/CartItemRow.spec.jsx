import React from 'react';
import { render, screen } from '@testing-library/react';
import CartItemRow from '../../../../src/components/molecules/CartItemRow.jsx';

const mockItem = { id: 1, nombre: 'Zapa', precio: 100, cantidad: 2 };

describe('CartItemRow', () => {
  it('muestra nombre y precio', () => {
    render(<table><tbody><CartItemRow item={mockItem} /></tbody></table>);
    expect(screen.getByText(/Zapa/i)).toBeTruthy();
    expect(screen.getByText(/100/)).toBeTruthy();
  });
});
