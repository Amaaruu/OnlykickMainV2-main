import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/atoms/Logo.css';

// Su funcion es renderizar el logo de la aplicacion
function Logo() {
    return (
        <Link to="/">
            <img src="/img/logoOnlyKick.webp" alt="Logo OnlyKick" className="app-logo" />
        </Link>
    );
}

export default Logo;