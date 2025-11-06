import React from 'react';
import '../../styles/atoms/Text.css';

// Este componente es un átomo.
// Solo sabe como renderizar texto con diferentes variantes.
function Text({ as: Component = 'p', variant, children, className = '' }) {
    const variantClass = variant ? `text-${variant}` : '';

    return (
        <Component className={`atom-text ${variantClass} ${className}`}>
            {children}
        </Component>
    );
}

export default Text;