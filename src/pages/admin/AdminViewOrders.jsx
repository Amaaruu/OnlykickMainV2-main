import React, { useState, useEffect } from 'react';
import { Container, Table, Form, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import { apiCall } from '../../services/api';
import '../../styles/pages/admin/AdminViewOrders.css';

function AdminViewOrders() {
  const [orders, setOrders] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ventasData, estadosData] = await Promise.all([
        apiCall('/ventas'),
        apiCall('/estados-venta')
      ]);
      // Ordenar por ID descendente
      const ventasOrdenadas = (ventasData || []).sort((a, b) => b.idVenta - a.idVenta);
      setOrders(ventasOrdenadas);
      setStatuses(estadosData || []);
    } catch (err) {
      console.error(err);
      setError('Error al cargar datos.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (idVenta, newStatusId) => {
    try {
      await apiCall(`/ventas/${idVenta}`, 'PATCH', {
        estadoVenta: { idEstado: parseInt(newStatusId) }
      });
      // Actualizamos UI localmente
      setOrders(prev => prev.map(o => {
        if (o.idVenta === idVenta) {
            // Buscamos el nombre del nuevo estado para actualizar la visual
            const stObj = statuses.find(s => s.idEstado === parseInt(newStatusId));
            return { ...o, idEstado: parseInt(newStatusId), estado: stObj?.nombreEstado };
        }
        return o;
      }));
      alert('Estado actualizado');
    } catch (err) {
      alert('Error al actualizar');
    }
  };

  const handleDelete = async (idVenta) => {
    if(!window.confirm("¿Eliminar orden?")) return;
    try {
        await apiCall(`/ventas/${idVenta}`, 'DELETE');
        setOrders(prev => prev.filter(o => o.idVenta !== idVenta));
    } catch(e) { alert("Error al eliminar"); }
  };

  const getStatusBadge = (nombre) => {
    const n = nombre?.toLowerCase() || '';
    if(n.includes('completado') || n.includes('entregado')) return 'success';
    if(n.includes('enviado')) return 'info';
    if(n.includes('cancelado')) return 'danger';
    return 'warning';
  };

  if (loading) return <Container className="mt-5 text-center"><Spinner animation="border"/></Container>;

  return (
    <Container className="mt-4" fluid>
      <h2 className="mb-4">Historial de Órdenes</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover responsive size="sm" className="align-middle">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Productos (Detalle)</th> 
            <th>Total</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((venta) => (
            <tr key={venta.idVenta}>
              <td>{venta.idVenta}</td>
              <td style={{minWidth: '90px'}}>
                {new Date(venta.fecha).toLocaleDateString('es-CL')}
              </td>
              <td>
                <div style={{lineHeight: '1.2'}}>
                    <strong>{venta.clienteNombre}</strong><br/>
                    <small className="text-muted">{venta.clienteEmail}</small>
                </div>
              </td>
              
              {/* --- AQUÍ MOSTRAMOS LOS PRODUCTOS --- */}
              <td style={{ maxWidth: '300px' }}>
                {venta.items && venta.items.length > 0 ? (
                    <ul className="list-unstyled mb-0 small">
                        {venta.items.map((item, idx) => (
                            <li key={idx} className="mb-1 border-bottom pb-1">
                                <strong>{item.cantidad}x</strong> {item.nombreProducto} 
                                <br/>
                                <span className="text-muted">
                                    (Talla: {item.talla} | {item.color})
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : <span className="text-muted">- Sin items -</span>}
              </td>

              <td className="fw-bold text-nowrap">
                ${venta.total?.toLocaleString('es-CL')}
              </td>
              
              <td>
                <div className="d-flex flex-column gap-1">
                    <Badge bg={getStatusBadge(venta.estado)}>
                      {venta.estado}
                    </Badge>
                    <Form.Select 
                      size="sm" 
                      style={{fontSize: '0.8rem', width: '120px'}}
                      value={venta.idEstado || ''}
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
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(venta.idVenta)}>
                  🗑️
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminViewOrders;