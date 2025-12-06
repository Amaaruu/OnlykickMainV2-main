import React from 'react';
import '../../styles/atoms/Button.css';

function Button({ onClick, children, variant = 'dark', className = '', ...props }) {
    // Combinamos las clases: la base personalizada + la variante de bootstrap + las que vengan de fuera
    const finalClassName = `custom-btn btn-${variant} ${className}`;

    return (
        <button 
            className={finalClassName.trim()} 
            onClick={onClick}
            {...props} 
        >
            {children}
        </button>
    );
}

export default Button;