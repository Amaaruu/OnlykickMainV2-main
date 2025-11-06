import React from 'react'; // <--- ¡AÑADE ESTA LÍNEA AQUÍ!
import { Container, Row, Col, Image, Button, Alert } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { productos } from '../../data/products.js';

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const producto = productos.find(p => p.id === parseInt(id));

  if (!producto) {
    return (
      <Container className="my-5 text-center">
        <Alert variant="danger">
          <h4>Producto no encontrado</h4>
          <p>El producto que buscas no existe o ha sido eliminado.</p>
          <Link to="/productos">
            <Button variant="primary">Volver al catálogo</Button>
          </Link>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="align-items-center">
        <Col md={6} className="text-center mb-4 mb-md-0">
          <Image src={producto.imagen} alt={producto.nombre} className="product-detail-image" />
        </Col>
        <Col md={6} className="product-detail-info">
          <h2>{producto.nombre}</h2>
          <p className="lead">{producto.descripcion}</p>
          <h3 className="my-3 product-detail-price">
            ${producto.precio.toLocaleString('es-CL')}
          </h3>
          <div className="d-grid gap-2">
            <Button variant="danger" size="lg" onClick={() => addToCart(producto)}>
              Añadir al Carrito
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;