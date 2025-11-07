import React from 'react'; 
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { productos } from '../data/products.js'; 
import ProductCard from '../components/molecules/ProductCard'; 
import HeroCarousel from '../components/organisms/HeroCarousel.jsx';
import '../styles/pages/Home.css';

function Home({ addToCart }) { 
  const productosDestacados = productos.slice(0, 4);

  return (
    <>
      <HeroCarousel /> {/* Usamos el organismo HeroCarousel */}
      <Container className="my-5">
        {/* Banner Principal */}
        <Row className="align-items-center main-banner">
          <Col>
            <h1 className="banner-title">EL OUTFIT EMPIEZA EN LOS PIES.</h1>
            <p className="lead">Las zapatillas que marcan tu estilo. Encuentra lanzamientos exclusivos y los clásicos de siempre.</p>
            <Button as={Link} to="/productos" variant="danger" size="lg">Comprar Ahora</Button>
          </Col>
        </Row>

        {/* Productos Destacados */}
        <section>
          <h2 className="text-center mb-4">Productos Destacados</h2>
          <Row xs={1} sm={2} lg={4} className="g-4">
            {productosDestacados.map(producto => (
              <Col key={producto.id}>
                <ProductCard producto={producto} addToCart={addToCart} />
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </>
  );
}

export default Home;