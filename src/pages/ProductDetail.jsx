import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Alert, Spinner } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { apiCall } from '../services/api'; // <-- Importar API
import { adaptarProducto } from '../services/adapters'; // <-- Importar adaptador
import '../styles/pages/ProductDetail.css';

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchOneProduct = async () => {
      try {
        setLoading(true);
        // Llama al endpoint GET /productos/{id}
        const data = await apiCall(`/productos/${id}`);
        if (data) {
            setProducto(adaptarProducto(data));
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchOneProduct();
  }, [id]); 

  if (loading) return <Container className="text-center my-5"><Spinner animation="border" /></Container>;

  if (error || !producto) {
    return (
      <Container className="my-5 text-center">
        <Alert variant="danger">
          <h4>Producto no encontrado</h4>
          <Link to="/productos"><Button variant="primary">Volver al catálogo</Button></Link>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="align-items-center">
        <Col md={6} className="text-center mb-4 mb-md-0">
          <Image src={producto.imagen} alt={producto.nombre} className="product-detail-image" fluid />
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