import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ProductCard from '../components/molecules/ProductCard.jsx';
import { apiCall } from '../services/api';
import { adaptarProducto } from '../services/adapters'; 
import { useCart } from '../context/CartContext'; 

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { addToCart } = useCart(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const dataBackend = await apiCall('/productos');
        
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
          <Col key={producto.id}> 
            <ProductCard producto={producto} addToCart={addToCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;