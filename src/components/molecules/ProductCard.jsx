import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import Button from '../atoms/Button';
import Image from '../atoms/Image'; 
import '../../styles/molecules/ProductCard.css';

function ProductCard({ producto }) { 
  if (!producto) return null;

  return (
    <Card className="h-100 shadow-sm border-0 overflow-hidden product-card-hover">
      {/* 1. Link a la ruta PLURAL */}
      <Link to={`/productos/${producto.id}`} className="text-decoration-none">
        <div className="position-relative bg-light" style={{ paddingTop: '100%' }}>
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-4">
                <Image 
                    src={producto.imagen} 
                    alt={producto.nombre}
                    className="img-fluid"
                    style={{ maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }}
                />
            </div>
            <Badge bg="dark" className="position-absolute top-0 start-0 m-3 opacity-75">
                {producto.marca}
            </Badge>
        </div>
      </Link>

      <Card.Body className="d-flex flex-column p-3">
        <div className="mb-2">
            <small className="text-muted fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                {producto.categoria?.toUpperCase()}
            </small>
        </div>
        
        <Card.Title as="h6" className="fw-bold mb-3 text-truncate" title={producto.nombre}>
            <Link to={`/productos/${producto.id}`} className="text-dark text-decoration-none">
                {producto.nombre}
            </Link>
        </Card.Title>

        <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fs-5 fw-bold text-dark">
                    ${producto.precio?.toLocaleString('es-CL')}
                </span>
            </div>

            {/* 2. BOTÓN "VER OPCIONES" (Obliga a ir al detalle) */}
            <Link to={`/productos/${producto.id}`} className="d-block text-decoration-none">
                <Button variant="dark" className="w-100 rounded-pill">
                    Ver Detalles
                </Button>
            </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;