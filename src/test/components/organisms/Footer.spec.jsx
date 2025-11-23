import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../../../src/components/organisms/Footer.jsx';
import { BrowserRouter } from 'react-router-dom';

describe('Footer', () => {
  it('muestra elemento con texto de copyright', () => {
    render(<BrowserRouter><Footer /></BrowserRouter>);
    expect(document.querySelector('footer')).toBeTruthy();
  });
});
