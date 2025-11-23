import React from 'react';
import { render, screen } from '@testing-library/react';
import CartSummary from '../../../../src/components/molecules/CartSummary.jsx';

describe('CartSummary', () => {
  it('muestra subtotal y botón', () => {
    render(<CartSummary subtotal={200} />);
    expect(screen.getByText(/Subtotal/i)).toBeTruthy();
    expect(screen.getByText(/Proceder al Pago/i)).toBeTruthy();
  });
});
