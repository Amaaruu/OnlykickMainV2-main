import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import {QH} from '../../context/AuthContext'; // Asegúrate de importar AuthProvider correctamente
import Login from '../../pages/Login';
import { AuthProvider } from '../../context/AuthContext';

describe('Login Page', () => {
  it('debería renderizar el formulario de login', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    // CORRECCIÓN: Buscamos por LabelText porque "Correo Electrónico" es el label, no el placeholder
    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    
    // CORRECCIÓN: El botón dice "Ingresar", no "Iniciar sesión" (ese es el título h1)
    const loginButton = screen.getByRole('button', { name: /Ingresar/i });

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });

  it('debería interactuar con los campos correctamente', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const loginButton = screen.getByRole('button', { name: /Ingresar/i });

    // Simulamos escribir credenciales incorrectas
    fireEvent.change(emailInput, { target: { value: 'wrong-email@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'somepassword' } });
    
    // Hacemos click en el botón correcto
    fireEvent.click(loginButton);

    // Nota: Como tu AuthContext actual (mock) siempre hace login exitoso,
    // el test original verificaba que el error fuera NULL. Mantenemos esa lógica.
    await waitFor(() => {
      const errorMessage = screen.queryByText(/Fallo en el inicio de sesión/);
      expect(errorMessage).toBeNull();
    });
  });

  it('debería iniciar sesión correctamente con credenciales válidas', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const loginButton = screen.getByRole('button', { name: /Ingresar/i });

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'correctpassword' } });
    fireEvent.click(loginButton);

    // Esperamos que no ocurra ningún error visual tras el login exitoso
    await waitFor(() => {
        expect(screen.queryByText(/Fallo en el inicio/i)).toBeNull();
    });
  });
});