import React from 'react';
import { Container, Row, Col, Table, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import CartItemRow from '../components/molecules/CartItemRow.jsx';
import CartSummary from '../components/molecules/CartSummary.jsx';
import '../styles/pages/Carrito.css';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx'; 
import { apiCall } from '../services/api';

function Carrito() {
  const { cartItems, removeFromCart, clearCart, cartTotal } = useCart(); 
  
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!isAuthenticated || !user) {
      alert("Debes iniciar sesión para comprar.");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    // Mapeamos los items para enviarlos al backend según lo que espera VentaService.
    // Nota: El backend usa idProducto, idTalla, idColor para verificar stock.
    const productosVenta = cartItems.map(item => ({
        producto: { idProducto: item.id },
        talla: { idTalla: item.selectedTallaId || 1 },   
        color: { idColor: item.selectedColorId || 1 },   
        cantidad: 1 
    }));

    const ventaPayload = {
        usuario: { idUsuario: user.idUsuario },
        direccion: { idDireccion: 1 }, // ID fijo por ahora, idealmente vendría de un selector
        estadoVenta: { idEstado: 1 }, 
        metodoPago: { idMetodoPago: 1 }, 
        metodoEnvio: { idMetodoEnvio: 1 }, 
        productosVenta: productosVenta,
        totalVenta: cartTotal 
    };

    try {
        const response = await apiCall('/ventas', 'POST', ventaPayload);
        
        if (response) {
            alert(`¡Compra realizada con éxito! ID Orden: ${response.idVenta}`);
            clearCart(); 
            navigate('/'); 
        }
    } catch (error) {
        console.error("Error en la compra:", error);
        if (error.message && error.message.includes("No hay stock")) {
            alert("Error: " + error.message);
        } else {
            alert("Hubo un problema al procesar la venta. Verifica que los datos de dirección y stock existan en la base de datos.");
        }
    }
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Mi Carrito de Compras</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
             <Alert variant="info">Tu carrito está vacío. ¡Ve a comprar algo!</Alert>
          ) : (
             <Table striped bordered hover responsive className="align-middle">
               <thead>
                 <tr>
                   <th>Producto</th>
                   <th>Detalles</th>
                   <th>Precio</th>
                   <th>Acciones</th>
                 </tr>
               </thead>
               <tbody>
                {cartItems.map((item) => (
                  <CartItemRow 
                    // Usamos el ID único generado en el contexto como key
                    key={item.cartItemId}
                    item={item} 
                    // Pasamos una función que llama a removeFromCart con el ID único específico
                    removeFromCart={() => removeFromCart(item.cartItemId)} 
                  />
                ))}
              </tbody>
             </Table>
          )}
        </Col>
        <Col md={4}>
          <CartSummary subtotal={cartTotal} onCheckout={handleCheckout} />
        </Col>
      </Row>
    </Container>
  );
}

export default Carrito;