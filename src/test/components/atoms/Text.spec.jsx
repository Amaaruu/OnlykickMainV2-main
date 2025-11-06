import React from 'react';
import { render, screen } from '@testing-library/react';
import Text from '../../../components/atoms/Text';
import '@testing-library/jasmine-dom';

describe('Pruebas para el Átomo: Text', () => {

  //Verifica el renderizado por defecto.
  it('debería renderizar como un párrafo (<p>) por defecto con el texto correcto', () => {
    render(<Text>Bienvenido</Text>);

    // Buscamos el elemento por el texto que contiene.
    const textElement = screen.getByText('Bienvenido');

    expect(textElement).toBeTruthy();
    // Verifica que la etiqueta sea 'P' (párrafo).
    expect(textElement.tagName).toBe('P');
  });

  //Verifica que se puede renderizar como otra etiqueta (h1).
  it('debería renderizar como un h1 cuando se le pasa la prop "as"', () => {
    render(<Text as="h1">Título Principal</Text>);
    
    // Buscamos el elemento por su rol de "heading" y su nombre.
    const headingElement = screen.getByRole('heading', { name: /Título Principal/i });
    
    expect(headingElement).toBeTruthy();
    //Verifica que la etiqueta sea 'H1'.
    expect(headingElement.tagName).toBe('H1');
  });

  //Verifica que las clases de variante se aplican correctamente.
  it('debería aplicar la clase de variante correcta', () => {
    render(<Text variant="price">$99.990</Text>);

    const textElement = screen.getByText('$99.990');
    
    // Verificamos que tenga la clase base y la clase de la variante.
    expect(textElement).toHaveClass('atom-text');
    expect(textElement).toHaveClass('text-price');
  });

    // En: src/test/components/atoms/Text.spec.jsx

  it('debería tener solo la clase base si no se proporciona una variante', () => {
    render(<Text>Texto sin variante</Text>);

    const textElement = screen.getByText('Texto sin variante');
    
    
    //Verifica que la clase principal exista.
    expect(textElement).toHaveClass('atom-text');

    //elimina los espacios extra al principio y al final,
    //asegurando que "atom-text" es la única clase presente.
    expect(textElement.className.trim()).toBe('atom-text');
  });

});