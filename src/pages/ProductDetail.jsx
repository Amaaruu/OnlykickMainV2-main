import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Alert, Spinner, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { apiCall } from '../services/api';
import { adaptarProducto } from '../services/adapters';
import { useCart } from '../context/CartContext'; 
import '../styles/pages/ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [tallasDisponibles, setTallasDisponibles] = useState([]);
  const [selectedInventarioId, setSelectedInventarioId] = useState('');
  
  const { addToCart } = useCart(); // Obtener función del contexto
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setLoading(true);
        const prodData = await apiCall(`/productos/${id}`);
        if (prodData) setProducto(adaptarProducto(prodData));

        const invData = await apiCall(`/inventario/producto/${id}`);
        if (invData && Array.isArray(invData)) {
            setTallasDisponibles(invData.filter(item => item.stock > 0));
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedInventarioId) {
        alert("Por favor selecciona una talla");
        return;
    }
    const itemInv = tallasDisponibles.find(inv => inv.id_inventario === parseInt(selectedInventarioId));
    
    addToCart({
        ...producto,
        selectedTallaId: itemInv.talla.idTalla,
        selectedColorId: itemInv.color.idColor,
        selectedTallaNombre: itemInv.talla.valorTalla
    });
  };

  if (loading) return <Spinner animation="border" />;
  if (!producto) return <Alert variant="danger">Producto no encontrado</Alert>;

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}><Image src={producto.imagen} fluid /></Col>
        <Col md={6}>
          <h2>{producto.nombre}</h2>
          <h3 className="text-danger">${producto.precio.toLocaleString('es-CL')}</h3>
          
          <Form.Group className="my-4">
            <Form.Label>Selecciona Talla:</Form.Label>
            <Form.Select onChange={(e) => setSelectedInventarioId(e.target.value)}>
                <option value="">-- Seleccionar --</option>
                {tallasDisponibles.map(inv => (
                    <option key={inv.id_inventario} value={inv.id_inventario}>
                        Talla {inv.talla.valorTalla} ({inv.color.nombreColor})
                    </option>
                ))}
            </Form.Select>
          </Form.Group>

          <Button variant="danger" size="lg" onClick={handleAddToCart} disabled={tallasDisponibles.length === 0}>
            {tallasDisponibles.length === 0 ? "Sin Stock" : "Añadir al Carrito"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
export default ProductDetail;