import React, { useState, useEffect } from 'react';
import { Container, Table, Alert, Spinner, Button, Badge, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { apiCall } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Image from '../components/atoms/Image'; // Reutilizamos tu átomo
import '../styles/pages/MisCompras.css';

function MisCompras() {
    const { user, isAuthenticated } = useAuth();
    const [compras, setCompras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isAuthenticated && user) {
            fetchMisCompras();
        }
    }, [isAuthenticated, user]);

    const fetchMisCompras = async () => {
        setLoading(true);
        try {
            // CAMBIO CLAVE: Ahora llamamos al endpoint de USUARIOS, no de ventas.
            // El backend devuelve el UsuarioDTO que contiene "historialCompras" con los ITEMS detallados.
            const userData = await apiCall(`/usuarios/${user.idUsuario}`);
            
            if (userData && userData.historialCompras) {
                // Ordenamos: La más reciente primero
                const sortedData = userData.historialCompras.sort((a, b) => b.idVenta - a.idVenta);
                setCompras(sortedData);
            } else {
                setCompras([]);
            }
        } catch (err) {
            console.error("Error cargando compras:", err);
            setError("No pudimos cargar tu historial. Intenta más tarde.");
        } finally {
            setLoading(false);
        }
    };

    // Helper para el color del estado
    const getStatusVariant = (estado) => {
        const est = estado?.toLowerCase() || '';
        if (est.includes('pendiente')) return 'warning';
        if (est.includes('enviado')) return 'info';
        if (est.includes('entregado') || est.includes('completado')) return 'success';
        if (est.includes('cancelado')) return 'danger';
        return 'secondary';
    };

    if (!isAuthenticated) return null; // O redirigir

    if (loading) return <Container className="my-5 text-center"><Spinner animation="border" /></Container>;

    return (
        <Container className="my-5">
            <h2 className="mb-4 text-center fw-bold">Mis Pedidos</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            {!loading && !error && compras.length === 0 ? (
                <div className="text-center py-5 bg-light rounded">
                    <h4>Aún no has realizado ninguna compra 😢</h4>
                    <p className="text-muted">¡Es hora de estrenar unas zapatillas nuevas!</p>
                    <Link to="/productos">
                        <Button variant="danger" size="lg">Ver Productos</Button>
                    </Link>
                </div>
            ) : (
                <div className="d-flex flex-column gap-4">
                    {compras.map((venta) => (
                        <Card key={venta.idVenta} className="shadow-sm border-0 overflow-hidden">
                            <Card.Header className="bg-white border-bottom py-3">
                                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                                    <div>
                                        <span className="text-muted small text-uppercase">Pedido realizado el</span><br/>
                                        <strong>{new Date(venta.fecha).toLocaleDateString('es-CL')}</strong>
                                    </div>
                                    <div>
                                        <span className="text-muted small text-uppercase">Total</span><br/>
                                        <strong>${venta.total?.toLocaleString('es-CL')}</strong>
                                    </div>
                                    <div>
                                        <span className="text-muted small text-uppercase">Enviado a</span><br/>
                                        <span className="text-truncate d-inline-block" style={{maxWidth: '200px'}}>
                                            {venta.direccion || 'Dirección no disponible'}
                                        </span>
                                    </div>
                                    <div className="text-end">
                                        <span className="text-muted small text-uppercase">Pedido # {venta.idVenta}</span><br/>
                                        <Badge bg={getStatusVariant(venta.estado)}>{venta.estado}</Badge>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                {venta.items && venta.items.length > 0 ? (
                                    venta.items.map((item, index) => (
                                        <Row key={index} className="align-items-center mb-3 g-3">
                                            <Col xs={3} sm={2} md={1}>
                                                {/* Usamos tu átomo de imagen */}
                                                <Image 
                                                    src={item.urlImagen || "/img/zapatilla-default.webp"} 
                                                    alt={item.nombreProducto}
                                                    className="rounded"
                                                    style={{ width: '100%', height: '80px', objectFit: 'contain' }} 
                                                />
                                            </Col>
                                            <Col xs={9} sm={10} md={11}>
                                                <h6 className="mb-1 fw-bold">{item.nombreProducto}</h6>
                                                <p className="mb-0 text-muted small">
                                                    {item.marca} | Talla: {item.talla} | Color: {item.color}
                                                </p>
                                                <div className="mt-1">
                                                    <Badge bg="light" text="dark" className="border me-2">
                                                        Cant: {item.cantidad}
                                                    </Badge>
                                                    <span className="fw-bold text-danger">
                                                        ${item.precioUnitario?.toLocaleString('es-CL')}
                                                    </span>
                                                </div>
                                            </Col>
                                        </Row>
                                    ))
                                ) : (
                                    <Alert variant="warning" className="m-0">
                                        No se encontraron detalles de los productos para este pedido.
                                    </Alert>
                                )}
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}
        </Container>
    );
}

export default MisCompras;