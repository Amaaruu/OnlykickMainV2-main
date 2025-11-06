import React from 'react';
import '../../styles/atoms/Image.css';
// Su funcion es renderizar una imagen con estilos atomicos
// Recibe src, alt y className como props
function Image({ src, alt, className = '' }) {
    return (
        <img src={src} alt={alt} className={`atom-image ${className}`} />
    );
}

export default Image;