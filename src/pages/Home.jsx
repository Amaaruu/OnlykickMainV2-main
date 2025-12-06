import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductCard from '../components/molecules/ProductCard';
import HeroCarousel from '../components/organisms/HeroCarousel.jsx';
import { apiCall } from '../services/api'; 
import { adaptarProducto } from '../services/adapters'; 
import { useCart } from '../context/CartContext'; // Importar
import '../styles/pages/Home.css';

function Home() {
  const [productosDestacados, setProductosDestacados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { addToCart } = useCart(); // Obtener función

  useEffect(() => {
    const fetchDestacados = async () => {
      try {
        setLoading(true);
        const data = await apiCall('/productos');
        
        if (data && Array.isArray(data)) {
          const adaptados = data.map(adaptarProducto);
          setProductosDestacados(adaptados.slice(0, 4));
        } else {
          setProductosDestacados([]);
        }
      } catch (err) {
        console.error("Error cargando destacados:", err);
        setError("No se pudieron cargar los productos destacados.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestacados();
  }, []);

  return (
    <>
      <HeroCarousel />
      <Container className="my-5">
        <Row className="align-items-center main-banner">
          <Col>
            <h1 className="banner-title">EL OUTFIT EMPIEZA EN LOS PIES.</h1>
            <p className="lead">Las zapatillas que marcan tu estilo. Encuentra lanzamientos exclusivos y los clásicos de siempre.</p>
            <Button as={Link} to="/productos" variant="danger" size="lg">Comprar Ahora</Button>
          </Col>
        </Row>

        <section>
          <h2 className="text-center mb-4">Productos Destacados</h2>
          
          {loading && (
            <div className="text-center py-5">
              <Spinner animation="border" variant="danger" />
            </div>
          )}

          {error && <Alert variant="danger">{error}</Alert>}

          {!loading && !error && productosDestacados.length === 0 && (
            <Alert variant="info" className="text-center">No hay productos destacados en este momento.</Alert>
          )}

          {!loading && !error && (
            <Row xs={1} sm={2} lg={4} className="g-4">
              {productosDestacados.map(producto => (
                <Col key={producto.id}>
                  <ProductCard producto={producto} addToCart={addToCart} />
                </Col>
              ))}
            </Row>
          )}
        </section>
      </Container>
    </>
  );
}

export default Home;