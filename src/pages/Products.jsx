import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ProductCard from '../components/molecules/ProductCard.jsx';
import { apiCall } from '../services/api';
import { adaptarProducto } from '../services/adapters'; 

function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Llama al endpoint GET /productos
        const dataBackend = await apiCall('/productos');
        
        // Adaptamos y guardamos los productos
        const productosAdaptados = Array.isArray(dataBackend) 
            ? dataBackend.map(adaptarProducto) 
            : [];

        setProducts(productosAdaptados);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("No se pudieron cargar los productos. Revisa la conexión al backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Container className="my-5 text-center"><Spinner animation="border" /></Container>;
  if (error) return <Container className="my-5"><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Todos Nuestros Productos</h1>
      <Row xs={1} sm={2} lg={4} className="g-4">
        {products.map(producto => (
          // Usamos producto.id, que es adaptado de producto.idProducto
          <Col key={producto.id}> 
            <ProductCard producto={producto} addToCart={addToCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;