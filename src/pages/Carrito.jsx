import React from 'react';
import { Container, Row, Col, Table, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Importar useNavigate
import CartItemRow from '../components/molecules/CartItemRow.jsx';
import CartSummary from '../components/molecules/CartSummary.jsx';
import '../styles/pages/Carrito.css';
import { useAuth } from '../context/AuthContext.jsx'; // Necesitamos el usuario
import { apiCall } from '../services/api'; // Tu servicio de API

function Carrito({ cartItems, removeFromCart, clearCart }) { // Añade clearCart si tienes la función en App.jsx
  const subtotal = cartItems.reduce((sum, item) => sum + item.precio, 0);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para comprar.");
      navigate("/login");
      return;
    }

    // 1. Construir el payload para el Backend
    // IMPORTANTE: Asumimos Talla ID=1 y Color ID=1 temporalmente
    const productosVenta = cartItems.map(item => ({
        producto: { idProducto: item.id },
        talla: { idTalla: 1 },   // <--- OJO: Esto debería venir del item seleccionado
        color: { idColor: 1 },   // <--- OJO: Esto también
        cantidad: 1 
    }));

    const ventaPayload = {
        usuario: { idUsuario: user.idUsuario }, // Asegúrate que tu user del context tenga idUsuario
        direccion: { idDireccion: 1 }, // <--- Debes permitir al usuario elegir o crear dirección
        estadoVenta: { idEstado: 1 }, // 1 = Pendiente (según tu BD)
        metodoPago: { idMetodoPago: 1 }, // 1 = Débito/Crédito
        metodoEnvio: { idMetodoEnvio: 1 }, // 1 = Envío Estándar
        productosVenta: productosVenta,
        totalVenta: subtotal
    };

    try {
        // 2. Llamar a la API
        const response = await apiCall('/ventas', 'POST', ventaPayload);
        
        if (response) {
            alert(`¡Compra realizada con éxito! ID Orden: ${response.idVenta}`);
            // Aquí deberías vaciar el carrito (necesitas pasar esa función desde App.jsx)
            // clearCart(); 
            navigate('/'); // Volver al home o a "Mis Pedidos"
        }
    } catch (error) {
        console.error("Error en la compra:", error);
        alert("Hubo un problema al procesar la venta. Revisa el stock o intenta más tarde.");
    }
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Mi Carrito de Compras</h1>
      <Row>
        <Col md={8}>
          {/* ... Tabla igual que antes ... */}
          {cartItems.length === 0 ? (
             <Alert variant="info">Tu carrito está vacío.</Alert>
          ) : (
             <Table striped bordered hover responsive>
               {/* ... render de items ... */}
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
          {/* Pasamos la función handleCheckout */}
          <CartSummary subtotal={subtotal} onCheckout={handleCheckout} />
        </Col>
      </Row>
    </Container>
  );
}

export default Carrito;