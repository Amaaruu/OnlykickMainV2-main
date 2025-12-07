import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Alert, Spinner, Form } from 'react-bootstrap';
import Button from '../components/atoms/Button'; 
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
  
  const { addToCart } = useCart(); 
  
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

  if (loading) return <Container className="my-5 text-center"><Spinner animation="border" /></Container>;
  if (error || !producto) return <Container className="my-5"><Alert variant="danger">Producto no encontrado</Alert></Container>;

  return (
    <Container className="my-5">
      <Row className="align-items-center">
        <Col md={6} className="mb-4 mb-md-0">
            <Image src={producto.imagen} fluid className="product-detail-image" />
        </Col>
        
        <Col md={6} className="product-detail-info">
          <h2 className="display-5 fw-bold mb-3">{producto.nombre}</h2>
          
          <div className="product-detail-price mb-3">
            ${producto.precio.toLocaleString('es-CL')}
          </div>
          
          <p className="lead text-muted mb-4">
            {producto.descripcion || "Sin descripción disponible."}
          </p>
          
          <Form.Group className="my-4 p-3 bg-light rounded">
            <Form.Label className="fw-bold">Selecciona tu Talla:</Form.Label>
            <Form.Select 
                size="lg"
                value={selectedInventarioId}
                onChange={(e) => setSelectedInventarioId(e.target.value)}
            >
                <option value="">-- Elige una opción --</option>
                {tallasDisponibles.map(inv => (
                    <option key={inv.id_inventario} value={inv.id_inventario}>
                        Talla {inv.talla.valorTalla} ({inv.color.nombreColor})
                    </option>
                ))}
            </Form.Select>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button 
                variant="danger" 
                className="py-3 fs-5" 
                onClick={handleAddToCart} 
                disabled={tallasDisponibles.length === 0}
            >
                {tallasDisponibles.length === 0 ? "Agotado" : "Añadir al Carrito 🛒"}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default ProductDetail;