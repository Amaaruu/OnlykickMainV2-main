import React from 'react';
import Input from '../atoms/Input';
import '../../styles/molecules/FormField.css';

// Su funcion es crear un campo de formulario con etiqueta, entrada y manejo de errores
// Recibe props para la etiqueta, nombre del campo, registro (para react-hook-form), errores y otras propiedades de entrada
function FormField({ 
    label, 
    name, 
    register, 
    errors,
    validationRules,  // Se agrega validationRules para la validacion 
     ...inputProps }) {
    return (
        <div className="form-field">
            <label htmlFor={name} className="form-field-label">{label}</label>
            <Input id={name} {...register(name, validationRules)} {...inputProps} />
            {errors[name] && <p className="form-field-error">{errors[name].message}</p>}
        </div>
    );
}

export default FormField;