import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../components/atoms/Button'; 

describe('Pruebas para el Átomo: Button', () => {

  it('debería renderizar el botón con el texto que se le pasa como children', () => {
    render(<Button>Comprar Ahora</Button>);
    const buttonElement = screen.getByText('Comprar Ahora');

    
    expect(buttonElement).toBeTruthy();
    
  });

  it('debería llamar a la función onClick cuando el usuario hace clic', () => {
    const onClickSpy = jasmine.createSpy('onClick');
    render(<Button onClick={onClickSpy}>Añadir al Carrito</Button>);
    fireEvent.click(screen.getByText('Añadir al Carrito'));

    expect(onClickSpy).toHaveBeenCalled();
  });

  it('debería aplicar la clase por defecto "btn-dark"', () => {
    const { container } = render(<Button>Botón Oscuro</Button>);
    const button = container.firstChild;

    
    expect(button.classList.contains('btn-dark')).toBeTrue();
  });

  it('debería aplicar la clase correcta cuando se le pasa una variante específica', () => {
    const { container } = render(<Button variant="light">Botón Claro</Button>);
    const button = container.firstChild;

    expect(button.classList.contains('btn-light')).toBeTrue();
  });
});