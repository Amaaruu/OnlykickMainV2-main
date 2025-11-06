import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { productos } from '../data/products.js';
import ProductCard from '../components/molecules/ProductCard.jsx';

// su funcion es renderizar la pagina de productos y pasar la funcion addToCart al componente ProductCard
// Pasamos la función 'addToCart' como prop desde el componente padre (App.js) a este componente Products
// Luego, la pasamos nuevamente como prop al componente ProductCard para que pueda utilizarla cuando se haga clic en el botón "Agregar al carrito"
function Products({ addToCart }) {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Todos Nuestros Productos</h1>
      <Row xs={1} sm={2} lg={4} className="g-4">
        {productos.map(producto => (
          <Col key={producto.id}>
            {/*Pasamos la función 'addToCart' hacia el componente ProductCard.*/}
            <ProductCard producto={producto} addToCart={addToCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;