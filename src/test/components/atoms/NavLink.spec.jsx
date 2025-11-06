import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavLink from '../../../components/atoms/NavLink';
import '@testing-library/jasmine-dom';

describe('Pruebas para el Átomo: NavLink', () => {

  //Verifica que el enlace se renderiza con el texto correcto.
  it('debería renderizar el enlace con el texto correcto', () => {
    //El componente debe estar envuelto en un MemoryRouter.
    render(
      <MemoryRouter>
        <NavLink to="/productos">Productos</NavLink>
      </MemoryRouter>
    );

    // La forma más robusta es buscar por el rol "link" y su nombre (el texto).
    const linkElement = screen.getByRole('link', { name: /Productos/i });

    //Verifica que el elemento existe.
    expect(linkElement).toBeTruthy();
  });

  //Verifica que el enlace apunta a la ruta correcta.
  it('debería apuntar al "href" correcto pasado en la prop "to"', () => {
    render(
      <MemoryRouter>
        <NavLink to="/contacto">Contacto</NavLink>
      </MemoryRouter>
    );
    
    const linkElement = screen.getByRole('link', { name: /Contacto/i });

    //Verificaque el atributo 'href' del enlace coincida con la prop "to".
    expect(linkElement.getAttribute('href')).toBe('/contacto');
  });

  //Verifica que la clase CSS se aplica correctamente.
  it('debería tener la clase CSS "nav-link-atom"', () => {
    render(
      <MemoryRouter>
        <NavLink to="/nosotros">Nosotros</NavLink>
      </MemoryRouter>
    );

    const linkElement = screen.getByRole('link', { name: /Nosotros/i });

    //Verifica que el enlace tenga la clase de estilo atómico.
    expect(linkElement).toHaveClass('nav-link-atom');
  });
});