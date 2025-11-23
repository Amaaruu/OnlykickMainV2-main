import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminNav from '../../../../src/components/organisms/AdminNav.jsx';
import { BrowserRouter } from 'react-router-dom';

describe('AdminNav', () => {
  it('renderiza enlaces básicos', () => {
    render(<BrowserRouter><AdminNav /></BrowserRouter>);
    // Comprobar que existe algún enlace
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });
});
