import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../../components/atoms/Input';
import '@testing-library/jasmine-dom';

describe('Pruebas para el Átomo: Input', () => {

  //Verifica el renderizado por defecto.
  it('debería renderizar un input de tipo texto por defecto', () => {
   
    // Usa'getByRole' para buscar un campo de texto genérico.
    render(<Input placeholder="Nombre de usuario" />);

    //Encuentra el input por su texto de placeholder.
    const inputElement = screen.getByPlaceholderText('Nombre de usuario');

    //Verifica que el elemento existe.
    expect(inputElement).toBeTruthy();
    
    //Verifica que sea un <input> de tipo "text".
    expect(inputElement.tagName).toBe('INPUT');
    expect(inputElement.getAttribute('type')).toBe('text');
  });

  //Verifica que se renderiza como un textarea.
  it('debería renderizar como un textarea cuando se le pasa la prop "as"', () => {
    render(<Input as="textarea" placeholder="Escribe tu mensaje" />);
    
    const textareaElement = screen.getByPlaceholderText('Escribe tu mensaje');
    
    expect(textareaElement).toBeTruthy();
    // Verifica que la etiqueta ahora sea TEXTAREA.
    expect(textareaElement.tagName).toBe('TEXTAREA');
  });

  // Verifica la interacción del usuario (escribir en el input).
  it('debería llamar a la función onChange cuando el usuario escribe', () => {
    //Crea una función "espía".
    const onChangeSpy = jasmine.createSpy('onChange');

    //Pasamos el espía como prop.
    render(<Input placeholder="Email" onChange={onChangeSpy} />);
    const inputElement = screen.getByPlaceholderText('Email');

    //Simula que el usuario escribe "hola" en el input.
    fireEvent.change(inputElement, { target: { value: 'hola' } });

    //Verifica que nuestra función espía fue llamada.
    expect(onChangeSpy).toHaveBeenCalled();
  });
});