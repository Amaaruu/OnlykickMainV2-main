import React from 'react'; 
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { productos } from '../data/products.js'; 
import ProductCard from '../components/molecules/ProductCard'; 
import '../styles/pages/Home.css';

function Home({ addToCart }) { 
  const productosDestacados = productos.slice(0, 4);

  return (
    <>
      {/* Carrusel de Imagenes */}
      <Carousel interval={3000} pause={false}>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="/img/jordan-fondo.webp"
            alt="Fondo Jordan"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="/img/BASKETABALL,BLANCO Y NEGRO.webp.jpg"
            alt="Jugador de Basketball"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image carousel-image-centered"
            src="/img/FlightJordan.webp"
            alt="Logo Flight Jordan"
          />
        </Carousel.Item>
      </Carousel>

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