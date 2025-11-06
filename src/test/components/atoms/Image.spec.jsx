import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from '../../../components/atoms/Image'; 

import '@testing-library/jasmine-dom'; 

describe('Pruebas para el Átomo: Image', () => {

  it('debería renderizar la imagen con los atributos src y alt correctos', () => {
    render(<Image src="test-image.jpg" alt="Zapatilla de prueba" />);

    const imageElement = screen.getByRole('img');

    
    expect(imageElement.getAttribute('src')).toBe('test-image.jpg');
    expect(imageElement.getAttribute('alt')).toBe('Zapatilla de prueba');
  });

  it('debería tener la clase base "atom-image" y cualquier clase adicional', () => {
    render(<Image src="test.jpg" alt="test" className="custom-class" />);
    const imageElement = screen.getByRole('img');

    expect(imageElement).toHaveClass('atom-image');
    expect(imageElement).toHaveClass('custom-class');
  });
});