import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { apiCall } from '../../services/api';

function AdminManageProducts() {
  const [products, setProducts] = useState([]);
  
  // Estados para las listas desplegables (Foreign Keys)
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [generos, setGeneros] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estado para el Modal
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null si es crear, objeto si es editar

  // Formulario inicial
  const initialFormState = {
    nombreProducto: '',
    descripcion: '',
    precioBase: '',
    idCategoria: '',
    idMarca: '',
    idMaterial: '',
    idGenero: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  // --- 1. CARGAR DATOS AL INICIO ---
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Cargamos todo en paralelo para que sea más rápido
      const [prodData, catData, marcData, matData, genData] = await Promise.all([
        apiCall('/productos'),
        apiCall('/categorias'),
        apiCall('/marcas'),
        apiCall('/materiales'),
        apiCall('/generos')
      ]);

      setProducts(prodData || []);
      setCategorias(catData || []);
      setMarcas(marcData || []);
      setMateriales(matData || []);
      setGeneros(genData || []);
    } catch (err) {
      console.error(err);
      setError('Error al cargar los datos. Asegúrate que el backend esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  // --- 2. MANEJO DEL MODAL Y FORMULARIO ---
  const handleClose = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData(initialFormState);
  };

  const handleShowCreate = () => {
    setEditingProduct(null);
    setFormData(initialFormState);
    setShowModal(true);
  };

  const handleShowEdit = (product) => {
    setEditingProduct(product);
    // Rellenamos el formulario con los datos existentes
    setFormData({
      nombreProducto: product.nombreProducto,
      descripcion: product.descripcion,
      precioBase: product.precioBase,
      idCategoria: product.categoria?.idCategoria || '',
      idMarca: product.marca?.idMarca || '',
      idMaterial: product.material?.idMaterial || '',
      idGenero: product.genero?.idGenero || ''
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- 3. GUARDAR (CREAR O EDITAR) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Construimos el objeto payload que espera Spring Boot
      // Spring Boot espera objetos anidados para las relaciones
      const payload = {
        nombreProducto: formData.nombreProducto,
        descripcion: formData.descripcion,
        precioBase: parseFloat(formData.precioBase),
        categoria: formData.idCategoria ? { idCategoria: parseInt(formData.idCategoria) } : null,
        marca: formData.idMarca ? { idMarca: parseInt(formData.idMarca) } : null,
        material: formData.idMaterial ? { idMaterial: parseInt(formData.idMaterial) } : null,
        genero: formData.idGenero ? { idGenero: parseInt(formData.idGenero) } : null
      };

      if (editingProduct) {
        // EDITAR (PUT)
        await apiCall(`/productos/${editingProduct.idProducto}`, 'PUT', payload);
        alert('Producto actualizado correctamente');
      } else {
        // CREAR (POST)
        await apiCall('/productos', 'POST', payload);
        alert('Producto creado correctamente');
      }
      
      handleClose();
      fetchAllData(); // Recargar tabla
    } catch (err) {
      console.error(err);
      alert('Error al guardar el producto');
    }
  };

  // --- 4. ELIMINAR ---
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await apiCall(`/productos/${id}`, 'DELETE');
        fetchAllData(); // Recargar tabla
      } catch (err) {
        console.error(err);
        alert('Error al eliminar el producto');
      }
    }
  };

  if (loading) return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Productos</h2>
        <Button variant="success" onClick={handleShowCreate}>+ Nuevo Producto</Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Marca</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.idProducto}>
              <td>{prod.idProducto}</td>
              <td>{prod.nombreProducto}</td>
              <td>${prod.precioBase?.toLocaleString()}</td>
              <td>{prod.categoria?.nombreCategoria || '-'}</td>
              <td>{prod.marca?.nombreMarca || '-'}</td>
              <td>
                <Button variant="primary" size="sm" className="me-2" onClick={() => handleShowEdit(prod)}>
                  Editar
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(prod.idProducto)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* --- MODAL DE FORMULARIO --- */}
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? 'Editar Producto' : 'Crear Nuevo Producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del Producto</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="nombreProducto" 
                    value={formData.nombreProducto} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Precio Base</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="precioBase" 
                    value={formData.precioBase} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="descripcion" 
                value={formData.descripcion} 
                onChange={handleChange} 
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select name="idCategoria" value={formData.idCategoria} onChange={handleChange}>
                    <option value="">Seleccione...</option>
                    {categorias.map(c => (
                      <option key={c.idCategoria} value={c.idCategoria}>{c.nombreCategoria}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Marca</Form.Label>
                  <Form.Select name="idMarca" value={formData.idMarca} onChange={handleChange}>
                    <option value="">Seleccione...</option>
                    {marcas.map(m => (
                      <option key={m.idMarca} value={m.idMarca}>{m.nombreMarca}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Material</Form.Label>
                  <Form.Select name="idMaterial" value={formData.idMaterial} onChange={handleChange}>
                    <option value="">Seleccione...</option>
                    {materiales.map(m => (
                      <option key={m.idMaterial} value={m.idMaterial}>{m.nombreMaterial}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Género</Form.Label>
                  <Form.Select name="idGenero" value={formData.idGenero} onChange={handleChange}>
                    <option value="">Seleccione...</option>
                    {generos.map(g => (
                      <option key={g.idGenero} value={g.idGenero}>{g.nombreGenero}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end mt-4">
              <Button variant="secondary" onClick={handleClose} className="me-2">Cancelar</Button>
              <Button variant="primary" type="submit">Guardar</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default AdminManageProducts;