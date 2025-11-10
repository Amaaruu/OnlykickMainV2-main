import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Logo from '../../../components/atoms/Logo';
import '@testing-library/jasmine-dom';

describe('Pruebas para el Átomo: Logo', () => {

  //Prueba que el componente Logo se renderiza correctamente.
  it('debería renderizar la imagen con los atributos correctos', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    //Encuentra la imagen por su texto alternativo (con mayúsculas).
    const logoImage = screen.getByAltText('Logo OnlyKick');

    expect(logoImage.getAttribute('src')).toBe('/img/logoOnlyKick.webp');
    expect(logoImage.className).toContain('app-logo');
  });

  //Prueba que el logo es un enlace que apunta a la ruta raíz ("/").
  it('debería ser un enlace que apunte a la ruta raíz ("/")', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    //Encuentra la imagen por su texto alternativo (con mayúsculas).
    const logoImage = screen.getByAltText('Logo OnlyKick');

    //Busca el enlace "padre" más cercano.
    const linkElement = logoImage.closest('a');

    //Verifica que el enlace apunte a "/".
    expect(linkElement.getAttribute('href')).toBe('/');
  });
});