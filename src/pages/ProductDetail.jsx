import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Alert, Spinner, Form } from 'react-bootstrap'; // <--- 1. Agregamos Form
import { useParams, Link } from 'react-router-dom';
import { apiCall } from '../services/api';
import { adaptarProducto } from '../services/adapters';
import '../styles/pages/ProductDetail.css';

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  
  // --- 2. Nuevos estados para el manejo de tallas e inventario ---
  const [tallas, setTallas] = useState([]);
  const [selectedTalla, setSelectedTalla] = useState('');
  const [inventario, setInventario] = useState([]); 
  // -------------------------------------------------------------

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // A. Cargar Producto
        const dataProd = await apiCall(`/productos/${id}`);
        if (dataProd) {
            setProducto(adaptarProducto(dataProd));
        }

        // B. Cargar Inventario (Nuevo)
        // Esto nos trae todas las combinaciones de Talla/Color para este producto
        const dataInv = await apiCall(`/inventario/producto/${id}`);
        if (dataInv) {
            setInventario(dataInv);

            // Filtramos las tallas únicas que tengan stock > 0
            const tallasUnicas = [];
            const map = new Map();
            for (const item of dataInv) {
                // Si hay stock y no hemos guardado esta talla aún
                if (item.stock > 0 && !map.has(item.talla.idTalla)) {
                    map.set(item.talla.idTalla, true);
                    tallasUnicas.push(item.talla);
                }
            }
            // Ordenamos las tallas (opcional, asumiendo que son números)
            tallasUnicas.sort((a, b) => parseFloat(a.valorTalla) - parseFloat(b.valorTalla));
            setTallas(tallasUnicas);
        }

      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // --- 3. Nueva función para añadir al carrito con Talla y Color ---
  const handleAddToCart = () => {
    if (!selectedTalla) {
      alert("Por favor, selecciona una talla.");
      return;
    }

    // Buscamos la variante en el inventario que coincida con la talla seleccionada.
    // NOTA: Si una talla tiene múltiples colores, aquí tomamos el primero que encontramos.
    const variante = inventario.find(item => item.talla.idTalla === parseInt(selectedTalla) && item.stock > 0);

    if (variante) {
      addToCart({
        ...producto,
        // Guardamos los IDs reales de la BD para enviarlos luego en la compra
        selectedTallaId: variante.talla.idTalla,
        selectedTallaNombre: variante.talla.valorTalla,
        selectedColorId: variante.color.idColor, // ID del color asociado
        selectedColorNombre: variante.color.nombreColor
      });
    } else {
        alert("Error al seleccionar la variante.");
    }
  };

  if (loading) return <Container className="text-center my-5"><Spinner animation="border" /></Container>;
  if (error || !producto) return <Container className="my-5 text-center"><Alert variant="danger">Producto no encontrado</Alert></Container>;

  return (
    <Container className="my-5">
      <Row className="align-items-center">
        <Col md={6} className="text-center mb-4 mb-md-0">
          <Image src={producto.imagen} alt={producto.nombre} className="product-detail-image" fluid />
        </Col>
        <Col md={6} className="product-detail-info">
          <h2>{producto.nombre}</h2>
          <p className="lead">{producto.descripcion}</p>
          <h3 className="my-3 product-detail-price">${producto.precio.toLocaleString('es-CL')}</h3>
          
          {/* --- 4. Selector de Tallas --- */}
          <Form.Group className="mb-4">
            <Form.Label><strong>Selecciona tu Talla:</strong></Form.Label>
            <Form.Select 
                value={selectedTalla} 
                onChange={(e) => setSelectedTalla(e.target.value)}
                disabled={tallas.length === 0}
            >
                <option value="">Elige una opción...</option>
                {tallas.map(t => (
                    <option key={t.idTalla} value={t.idTalla}>{t.valorTalla}</option>
                ))}
            </Form.Select>
            {tallas.length === 0 && <small className="text-danger">Sin stock disponible</small>}
          </Form.Group>

          <div className="d-grid gap-2">
            {/* Cambiamos el onClick para usar nuestra nueva función */}
            <Button variant="danger" size="lg" onClick={handleAddToCart} disabled={tallas.length === 0}>
              Añadir al Carrito
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;