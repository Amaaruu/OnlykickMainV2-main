import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../../../../src/components/organisms/Navbar.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../../src/context/AuthContext';

describe('Navbar', () => {
  it('renderiza enlace al home', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
        </AuthProvider>
      </BrowserRouter>
    );
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });
});
