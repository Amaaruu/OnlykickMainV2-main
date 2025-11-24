import React from 'react';
import { Container, Row, Col, Table, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import CartItemRow from '../components/molecules/CartItemRow.jsx';
import CartSummary from '../components/molecules/CartSummary.jsx';
import '../styles/pages/Carrito.css';
import { useAuth } from '../context/AuthContext.jsx';
import { apiCall } from '../services/api';

function Carrito({ cartItems, removeFromCart, clearCart }) {
  // Calculamos el total
  const subtotal = cartItems.reduce((sum, item) => sum + item.precio, 0);
  
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    // 1. Validación de usuario
    if (!isAuthenticated || !user) {
      alert("Debes iniciar sesión para comprar.");
      navigate("/login");
      return;
    }

    // 2. Validación de carrito vacío
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    // 3. Construcción de los productos para la venta
    // AQUI ESTA LA CLAVE: Usamos selectedTallaId si existe, sino 1.
    const productosVenta = cartItems.map(item => ({
        producto: { idProducto: item.id },
        talla: { idTalla: item.selectedTallaId || 1 },   
        color: { idColor: item.selectedColorId || 1 },   
        cantidad: 1 
    }));

    // 4. Construcción del objeto Venta completo
    const ventaPayload = {
        usuario: { idUsuario: user.idUsuario },
        direccion: { idDireccion: 1 }, 
        estadoVenta: { idEstado: 1 }, 
        metodoPago: { idMetodoPago: 1 }, 
        metodoEnvio: { idMetodoEnvio: 1 }, 
        productosVenta: productosVenta,
        totalVenta: subtotal
    };

    try {
        // 5. Llamada al Backend
        const response = await apiCall('/ventas', 'POST', ventaPayload);
        
        if (response) {
            alert(`¡Compra realizada con éxito! ID Orden: ${response.idVenta}`);
            
            // Limpiar el carrito
            if (clearCart) clearCart(); 
            
            // Redirigir al home o historial
            navigate('/'); 
        }
    } catch (error) {
        console.error("Error en la compra:", error);
        // Mensaje de error más amigable
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
                {cartItems.map((item, index) => (
                  <CartItemRow 
                    // Usamos index como fallback para la key si hay items repetidos
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
          <CartSummary subtotal={subtotal} onCheckout={handleCheckout} />
        </Col>
      </Row>
    </Container>
  );
}

export default Carrito; 