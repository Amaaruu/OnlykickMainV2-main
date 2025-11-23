import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Contacto from '../../pages/Contacto'; 

describe('Pruebas para la Página: Contacto', () => {
  it('debería renderizar el título "Contáctanos"', async () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );

    // Espera a que el título esté presente en el DOM
    await waitFor(() => {
      const contactoTitle = screen.getByText(/Contáctanos/i);
      expect(contactoTitle).toBeTruthy();
    });
  });

  // Verifica que el formulario tenga los campos necesarios
  it('debería renderizar el formulario de contacto con los campos necesarios', async () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );

    // Verifica que los campos estén presentes
    await waitFor(() => {
      const nameField = screen.getByLabelText(/Nombre/i);
      const emailField = screen.getByLabelText(/Correo Electrónico/i);
      const messageField = screen.getByLabelText(/Mensaje/i);

      expect(nameField).toBeTruthy();
      expect(emailField).toBeTruthy();
      expect(messageField).toBeTruthy();
    });
  });

  it('debería renderizar el botón de enviar', async () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );

    // Espera a que el botón esté presente
    await waitFor(() => {
      const submitButton = screen.getByText(/Enviar Mensaje/i);
      expect(submitButton).toBeTruthy(); 
    });
  });
});
