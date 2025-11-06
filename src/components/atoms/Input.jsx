import React from 'react';
import '../../styles/atoms/Input.css';

// Usamos forwardRef para pasar refs a componentes funcionales.
// Permitimos que el componente sea un input o textarea basado en la prop 'as'.
// Por defecto, es un input de tipo texto.
const Input = React.forwardRef(({ type = 'text', as, ...props }, ref) => {
    const Component = as || 'input';
    return (
        <Component 
            type={type} 
            className="atom-input" 
            ref={ref} 
            {...props} 
        />
    );
});

export default Input;