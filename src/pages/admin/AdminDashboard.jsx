import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge, Alert, Spinner } from 'react-bootstrap';
import { apiCall } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import '../../styles/pages/admin/AdminDashboard.css'; 

function AdminDashboard() {
  const { user: currentUser } = useAuth(); // Para no borrarnos a nosotros mismos
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar usuarios al iniciar
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const data = await apiCall('/usuarios');
      // Ordenamos por ID
      setUsuarios(data.sort((a, b) => a.idUsuario - b.idUsuario));
    } catch (err) {
      console.error(err);
      setError('Error al cargar usuarios.');
    } finally {
      setLoading(false);
    }
  };

  // Función para cambiar rol (Admin <-> User)
  const toggleRole = async (usuario) => {
    const nuevoRol = usuario.rol === 'admin' ? 'user' : 'admin';
    if (!window.confirm(`¿Cambiar rol de ${usuario.nombreUsuario} a ${nuevoRol.toUpperCase()}?`)) return;

    try {
      await apiCall(`/usuarios/${usuario.idUsuario}`, 'PATCH', { rol: nuevoRol });
      // Actualizamos la lista localmente para reflejar el cambio rápido
      setUsuarios(prev => prev.map(u => 
        u.idUsuario === usuario.idUsuario ? { ...u, rol: nuevoRol } : u
      ));
    } catch (err) {
      alert('Error al cambiar el rol');
    }
  };

  // Función para eliminar usuario
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario? Se borrarán también sus compras.')) return;

    try {
      await apiCall(`/usuarios/${id}`, 'DELETE');
      setUsuarios(prev => prev.filter(u => u.idUsuario !== id));
    } catch (err) {
      alert('Error al eliminar usuario');
    }
  };

  if (loading) return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestión de Usuarios</h1>
        <Button variant="outline-primary" onClick={fetchUsuarios}>Refrescar Lista</Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover responsive className="align-middle">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Fecha Registro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.idUsuario}>
              <td>{u.idUsuario}</td>
              <td>{u.nombreUsuario}</td>
              <td>{u.email}</td>
              <td>
                <Badge bg={u.rol === 'admin' ? 'danger' : 'primary'}>
                  {u.rol ? u.rol.toUpperCase() : 'USER'}
                </Badge>
              </td>
              <td>{new Date(u.fechaCreacion).toLocaleDateString()}</td>
              <td>
                {/* No permitir borrarse ni editarse a uno mismo */}
                {u.email !== currentUser.email && (
                  <div className="d-flex gap-2">
                    <Button 
                      size="sm" 
                      variant={u.rol === 'admin' ? "outline-secondary" : "outline-success"}
                      onClick={() => toggleRole(u)}
                      title="Cambiar Rol"
                    >
                      {u.rol === 'admin' ? '⬇ Quitar Admin' : '⬆ Hacer Admin'}
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="danger"
                      onClick={() => handleDelete(u.idUsuario)}
                      title="Eliminar Usuario"
                    >
                      🗑️
                    </Button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminDashboard;