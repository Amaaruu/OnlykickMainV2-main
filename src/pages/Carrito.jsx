import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Alert, Form, Card, Spinner, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import CartItemRow from '../components/molecules/CartItemRow.jsx';
import CartSummary from '../components/molecules/CartSummary.jsx';
import AddressForm from '../components/molecules/AddressForm.jsx'; // <--- IMPORTAR EL NUEVO COMPONENTE
import '../styles/pages/Carrito.css';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx'; 
import { apiCall } from '../services/api';

function Carrito() {
  const { cartItems, removeFromCart, clearCart, cartTotal } = useCart(); 
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [direcciones, setDirecciones] = useState([]);
  const [metodosPago, setMetodosPago] = useState([]);
  const [metodosEnvio, setMetodosEnvio] = useState([]);
  
  const [selectedDireccion, setSelectedDireccion] = useState('');
  const [selectedPago, setSelectedPago] = useState('');
  const [selectedEnvio, setSelectedEnvio] = useState('');

  const [loadingData, setLoadingData] = useState(false);
  
  // Estado para controlar el Modal
  const [showAddressModal, setShowAddressModal] = useState(false);

  // Función auxiliar para cargar/recargar direcciones
  const fetchDirecciones = async () => {
      if (!user) return;
      try {
          const dirData = await apiCall(`/direcciones/usuario/${user.idUsuario}`);
          setDirecciones(dirData || []);
          // Si acabamos de crear una y no había selección, seleccionamos la nueva (la última de la lista)
          if (dirData && dirData.length > 0 && !selectedDireccion) {
              setSelectedDireccion(dirData[dirData.length - 1].idDireccion);
          }
      } catch (error) {
          console.error("Error cargando direcciones:", error);
      }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
        const fetchInitialData = async () => {
            setLoadingData(true);
            try {
                await fetchDirecciones(); // Cargamos direcciones
                const [pagoData, envioData] = await Promise.all([
                    apiCall('/metodos-pago'),
                    apiCall('/metodos-envio')
                ]);
                
                setMetodosPago(pagoData || []);
                setMetodosEnvio(envioData || []);

                if(pagoData?.length > 0) setSelectedPago(pagoData[0].idMetodoPago);
                if(envioData?.length > 0) setSelectedEnvio(envioData[0].idMetodoEnvio);

            } catch (error) {
                console.error("Error cargando datos:", error);
            } finally {
                setLoadingData(false);
            }
        };
        fetchInitialData();
    }
  }, [isAuthenticated, user]);

  // Callback cuando se crea una dirección exitosamente
  const handleAddressCreated = () => {
      setShowAddressModal(false);
      fetchDirecciones(); // Recargamos la lista del backend
      alert("Dirección agregada correctamente");
  };

  const handleCheckout = async () => {
    // ... (Misma lógica de validación que antes) ...
    if (!isAuthenticated || !user) { alert("Inicia sesión"); navigate("/login"); return; }
    if (cartItems.length === 0) { alert("Carrito vacío"); return; }
    if (!selectedDireccion) { alert("Selecciona una dirección"); return; }
    if (!selectedPago) { alert("Selecciona método de pago"); return; }
    if (!selectedEnvio) { alert("Selecciona método de envío"); return; }

    const productosVenta = cartItems.map(item => ({
        producto: { idProducto: item.id },
        talla: { idTalla: item.selectedTallaId || 1 },   
        color: { idColor: item.selectedColorId || 1 },   
        cantidad: 1 
    }));

    const ventaPayload = {
        usuario: { idUsuario: user.idUsuario },
        direccion: { idDireccion: parseInt(selectedDireccion) },
        estadoVenta: { idEstado: 1 },
        metodoPago: { idMetodoPago: parseInt(selectedPago) },
        metodoEnvio: { idMetodoEnvio: parseInt(selectedEnvio) },
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
        console.error("Error compra:", error);
        alert(error.message || "Error al procesar la venta");
    }
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Mi Carrito de Compras</h1>
      <Row>
        <Col md={8}>
          {/* Tabla de productos (Igual que antes) */}
          {cartItems.length === 0 ? (
             <Alert variant="info">Tu carrito está vacío.</Alert>
          ) : (
             <Table striped bordered hover responsive className="align-middle">
               <thead>
                 <tr><th>Producto</th><th>Detalles</th><th>Precio</th><th>Acciones</th></tr>
               </thead>
               <tbody>
                {cartItems.map((item) => (
                  <CartItemRow 
                    key={item.cartItemId} 
                    item={item} 
                    removeFromCart={() => removeFromCart(item.cartItemId)} 
                  />
                ))}
              </tbody>
             </Table>
          )}
        </Col>

        <Col md={4}>
            {isAuthenticated && cartItems.length > 0 && (
                <Card className="mb-3 shadow-sm">
                    <Card.Header className="bg-light fw-bold">Datos de Compra</Card.Header>
                    <Card.Body>
                        {loadingData ? (
                            <div className="text-center"><Spinner size="sm" animation="border" /></div>
                        ) : (
                            <Form>
                                {/* SECCIÓN DIRECCIÓN CON BOTÓN NUEVO */}
                                <Form.Group className="mb-3">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <Form.Label className="mb-0">📍 Dirección de Envío</Form.Label>
                                        <Button 
                                            variant="link" 
                                            size="sm" 
                                            className="p-0 text-decoration-none"
                                            onClick={() => setShowAddressModal(true)}
                                        >
                                            + Nueva
                                        </Button>
                                    </div>
                                    
                                    <Form.Select 
                                        value={selectedDireccion} 
                                        onChange={(e) => setSelectedDireccion(e.target.value)}
                                    >
                                        <option value="">-- Seleccionar --</option>
                                        {direcciones.map(d => (
                                            <option key={d.idDireccion} value={d.idDireccion}>
                                                {d.calle} #{d.numero}, {d.comuna?.nombreComuna}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                {/* Selectores de Pago y Envío (Iguales que antes) */}
                                <Form.Group className="mb-3">
                                    <Form.Label>🚚 Método de Envío</Form.Label>
                                    <Form.Select value={selectedEnvio} onChange={(e) => setSelectedEnvio(e.target.value)}>
                                        <option value="">-- Seleccionar --</option>
                                        {metodosEnvio.map(m => <option key={m.idMetodoEnvio} value={m.idMetodoEnvio}>{m.nombreMetodo}</option>)}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>💳 Método de Pago</Form.Label>
                                    <Form.Select value={selectedPago} onChange={(e) => setSelectedPago(e.target.value)}>
                                        <option value="">-- Seleccionar --</option>
                                        {metodosPago.map(p => <option key={p.idMetodoPago} value={p.idMetodoPago}>{p.nombreMetodo}</option>)}
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                        )}
                    </Card.Body>
                </Card>
            )}

          <CartSummary subtotal={cartTotal} onCheckout={handleCheckout} />
        </Col>
      </Row>

      {/* MODAL PARA CREAR DIRECCIÓN */}
      <Modal show={showAddressModal} onHide={() => setShowAddressModal(false)} centered>
          <Modal.Header closeButton>
              <Modal.Title>Agregar Nueva Dirección</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <AddressForm 
                  onSuccess={handleAddressCreated} 
                  onCancel={() => setShowAddressModal(false)} 
              />
          </Modal.Body>
      </Modal>

    </Container>
  );
}

export default Carrito;