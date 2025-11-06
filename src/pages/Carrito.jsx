import React from 'react';
import { Container, Row, Col, Table, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartItemRow from '../components/molecules/CartItemRow.jsx';
import CartSummary from '../components/molecules/CartSummary.jsx';
import '../styles/pages/Carrito.css';

// Su funcion es representar la pagina del carrito de compras
// Recibe los items del carrito y la funcion para removerlos
// Calcula el subtotal para pasarlo al resumen
// Muestra un mensaje si el carrito esta vacio
// Usa componentes atomicos y moleculares para componer la pagina
function Carrito({ cartItems, removeFromCart }) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.precio, 0);

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Mi Carrito de Compras</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Alert variant="info">
              Tu carrito de compras está vacío. <Link to="/productos">¡Mira nuestros productos!</Link>
            </Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <CartItemRow 
                    key={`${item.id}-${index}`}
                    item={item} 
                    removeFromCart={removeFromCart} 
                  />
                ))}
              </tbody>
            </Table>
          )}
        </Col>
        <Col md={4}>
          <CartSummary subtotal={subtotal} />
        </Col>
      </Row>
    </Container>
  );
}

export default Carrito;