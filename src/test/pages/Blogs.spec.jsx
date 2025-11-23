import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Blogs from '../../pages/Blogs'; 
import '@testing-library/jasmine-dom'; 

describe('Pruebas para la Página: Blogs', () => {

  // Prueba que los títulos de los blogs se renderizan correctamente.
  it('debería renderizar los títulos de los blogs', async () => {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>
    );

    // Usa waitFor para esperar que los elementos se rendericen correctamente
    const blogTitle1 = await waitFor(() => screen.getByText(/La Zapatilla que fue Prohibida por la NBA/i));
    const blogTitle2 = await waitFor(() => screen.getByText(/¿Una Suela Creada con una Wafflera de Cocina?/i));
    
    // Verifica que los títulos de los blogs estén presentes
    expect(blogTitle1).toBeTruthy();
    expect(blogTitle2).toBeTruthy();
  });

  // Verifica si las fechas de los blogs se renderizan correctamente.
  it('debería mostrar la fecha de publicación de cada blog', async () => {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>
    );

    // Espera a que las fechas estén en el documento
    await waitFor(() => {
      expect(screen.getByText('Publicado el: 17/10/1985')).toBeTruthy();
      expect(screen.getByText('Publicado el: 24/1/1971')).toBeTruthy();
    });
  });
});
