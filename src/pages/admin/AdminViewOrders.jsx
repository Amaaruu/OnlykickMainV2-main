import React, { useState, useEffect } from 'react';
import { Container, Table, Form, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import { apiCall } from '../../services/api';

function AdminViewOrders() {
  const [orders, setOrders] = useState([]);
  const [statuses, setStatuses] = useState([]); // Para la lista desplegable de estados
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 1. CARGAR ORDENES Y ESTADOS ---
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Cargamos Ventas y los tipos de Estados posibles en paralelo
      const [ventasData, estadosData] = await Promise.all([
        apiCall('/ventas'),
        apiCall('/estados-venta')
      ]);

      // Ordenar ventas por ID descendente (las más nuevas primero)
      const ventasOrdenadas = (ventasData || []).sort((a, b) => b.idVenta - a.idVenta);
      
      setOrders(ventasOrdenadas);
      setStatuses(estadosData || []);
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar las órdenes. Verifica la conexión con el backend.');
    } finally {
      setLoading(false);
    }
  };

  // --- 2. CAMBIAR ESTADO DE LA ORDEN ---
  const handleStatusChange = async (idVenta, newStatusId) => {
    try {
      // Enviamos solo el objeto estadoVenta con su ID al backend (PATCH)
      const payload = {
        estadoVenta: { idEstado: parseInt(newStatusId) }
      };

      await apiCall(`/ventas/${idVenta}`, 'PATCH', payload);
      
      // Actualizamos la UI localmente para que sea rápido
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.idVenta === idVenta 
            ? { ...order, estadoVenta: statuses.find(s => s.idEstado === parseInt(newStatusId)) } 
            : order
        )
      );
      alert(`Estado de la orden #${idVenta} actualizado.`);
    } catch (err) {
      console.error(err);
      alert('Error al actualizar el estado.');
    }
  };

  // --- 3. ELIMINAR ORDEN ---
  const handleDelete = async (idVenta) => {
    if (window.confirm(`¿Estás seguro de eliminar la orden #${idVenta}? Esto es irreversible.`)) {
      try {
        await apiCall(`/ventas/${idVenta}`, 'DELETE');
        // Filtramos la lista para quitar la eliminada
        setOrders(prevOrders => prevOrders.filter(o => o.idVenta !== idVenta));
      } catch (err) {
        console.error(err);
        alert('Error al eliminar la orden.');
      }
    }
  };

  // --- Helper para color de estado ---
  const getStatusBadge = (nombreEstado) => {
    switch(nombreEstado?.toLowerCase()) {
      case 'completado': return 'success';
      case 'entregado': return 'success';
      case 'enviado': return 'info';
      case 'pendiente': return 'warning';
      case 'cancelado': return 'danger';
      default: return 'secondary';
    }
  };

  if (loading) return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Historial de Órdenes</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}

      {orders.length === 0 ? (
        <Alert variant="info">No hay órdenes registradas todavía.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>#ID</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Método Pago</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((venta) => (
              <tr key={venta.idVenta}>
                <td>{venta.idVenta}</td>
                <td>
                  {venta.fechaVenta 
                    ? new Date(venta.fechaVenta).toLocaleDateString('es-CL') + ' ' + new Date(venta.fechaVenta).toLocaleTimeString('es-CL', {hour: '2-digit', minute:'2-digit'})
                    : '-'}
                </td>
                <td>
                  {venta.usuario ? (
                    <>
                      <strong>{venta.usuario.nombreUsuario}</strong><br/>
                      <small className="text-muted">{venta.usuario.email}</small>
                    </>
                  ) : 'Usuario Eliminado'}
                </td>
                <td className="fw-bold">
                  ${venta.totalVenta?.toLocaleString('es-CL')}
                </td>
                <td>{venta.metodoPago?.nombreMetodo || 'N/A'}</td>
                <td>
                  {/* Selector de Estado */}
                  <div className="d-flex align-items-center gap-2">
                    <Badge bg={getStatusBadge(venta.estadoVenta?.nombreEstado)}>
                      {venta.estadoVenta?.nombreEstado || 'Sin Estado'}
                    </Badge>
                    
                    {/* Dropdown pequeño para cambiar estado rápido */}
                    <Form.Select 
                      size="sm" 
                      style={{ width: '130px', fontSize: '0.8rem' }}
                      value={venta.estadoVenta?.idEstado || ''}
                      onChange={(e) => handleStatusChange(venta.idVenta, e.target.value)}
                    >
                      {statuses.map(st => (
                        <option key={st.idEstado} value={st.idEstado}>
                          {st.nombreEstado}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </td>
                <td>
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => handleDelete(venta.idVenta)}
                    title="Eliminar Orden"
                  >
                    🗑️
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default AdminViewOrders;