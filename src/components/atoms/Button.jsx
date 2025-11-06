import React from 'react';
import '../../styles/atoms/Button.css';

// Este componente es un atomo.
// Solo sabe como renderizar un boton y qur hacer cuando se le hace clic.
function Button({ onClick, children, variant = 'dark' }) {
    const className = `custom-btn btn-${variant}`;

    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;