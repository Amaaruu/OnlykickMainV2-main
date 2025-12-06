import React, { useState, useEffect } from 'react';
import { Container, Table, Alert, Spinner, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { apiCall } from '../services/api';
import { useAuth } from '../context/AuthContext';
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
            // Llamamos al endpoint del backend que filtra por ID de usuario
            const data = await apiCall(`/ventas/usuario/${user.idUsuario}`);
            
            // Ordenamos: La más reciente primero (ID descendente)
            const sortedData = Array.isArray(data) 
                ? data.sort((a, b) => b.idVenta - a.idVenta) 
                : [];
            
            setCompras(sortedData);
        } catch (err) {
            console.error("Error cargando compras:", err);
            setError("No pudimos cargar tu historial. Intenta más tarde.");
        } finally {
            setLoading(false);
        }
    };

    // Helper para el color del estado
    const getStatusClass = (estado) => {
        const est = estado?.toLowerCase() || '';
        if (est.includes('pendiente')) return 'status-pendiente';
        if (est.includes('enviado')) return 'status-enviado';
        if (est.includes('entregado') || est.includes('completado')) return 'status-completado';
        if (est.includes('cancelado')) return 'status-cancelado';
        return 'bg-secondary';
    };

    if (!isAuthenticated) {
        return (
            <Container className="my-5 text-center">
                <Alert variant="warning">Debes iniciar sesión para ver tus compras.</Alert>
                <Link to="/login"><Button variant="dark">Ir al Login</Button></Link>
            </Container>
        );
    }

    if (loading) return <Container className="my-5 text-center"><Spinner animation="border" /></Container>;

    return (
        <Container className="my-5">
            <h2 className="mb-4 text-center fw-bold">Historial de Compras</h2>

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
                <div className="mis-compras-container">
                    <Table responsive hover className="align-middle">
                        <thead className="table-light">
                            <tr>
                                <th># Orden</th>
                                <th>Fecha</th>
                                <th>Método Pago</th>
                                <th>Envío</th>
                                <th>Total</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {compras.map((venta) => (
                                <tr key={venta.idVenta}>
                                    <td className="fw-bold">#{venta.idVenta}</td>
                                    <td>
                                        {new Date(venta.fechaVenta).toLocaleDateString('es-CL')} <br/>
                                        <small className="text-muted">
                                            {new Date(venta.fechaVenta).toLocaleTimeString('es-CL', {hour: '2-digit', minute:'2-digit'})}
                                        </small>
                                    </td>
                                    <td>{venta.metodoPago?.nombreMetodo || '-'}</td>
                                    <td>{venta.metodoEnvio?.nombreMetodo || '-'}</td>
                                    <td className="fw-bold text-success">
                                        ${venta.totalVenta?.toLocaleString('es-CL')}
                                    </td>
                                    <td>
                                        <span className={`status-badge ${getStatusClass(venta.estadoVenta?.nombreEstado)}`}>
                                            {venta.estadoVenta?.nombreEstado || 'Desconocido'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </Container>
    );
}

export default MisCompras;