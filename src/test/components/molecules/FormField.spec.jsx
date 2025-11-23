import React from 'react';
import { render, screen } from '@testing-library/react';
import FormField from '../../../../src/components/molecules/FormField.jsx';
import { useForm } from 'react-hook-form';

// Render wrapper because FormField expects register prop
function Wrapper() {
  const { register } = useForm();
  return <FormField label="Test" name="test" register={register} errors={{}} />;
}

describe('FormField', () => {
  it('muestra label', () => {
    render(<Wrapper />);
    expect(screen.getByText(/Test/)).toBeTruthy();
  });
});
