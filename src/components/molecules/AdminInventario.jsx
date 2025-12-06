import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, Alert, Badge } from 'react-bootstrap';
import { apiCall } from '../../services/api';
import '../../styles/molecules/AdminInventario.css';

function AdminInventario({ idProducto }) {
    const [inventario, setInventario] = useState([]);
    const [tallas, setTallas] = useState([]);
    const [colores, setColores] = useState([]);
    
    // Formulario para agregar stock
    const [newStock, setNewStock] = useState({
        idTalla: '',
        idColor: '',
        cantidad: ''
    });

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        loadData();
    }, [idProducto]);

    const loadData = async () => {
        try {
            // Cargamos catálogos y el inventario actual
            const [invData, tallasData, coloresData] = await Promise.all([
                apiCall(`/inventario/producto/${idProducto}`), // Si falla (404/204) devolverá null o array vacío
                apiCall('/tallas'),
                apiCall('/colores')
            ]);

            setInventario(Array.isArray(invData) ? invData : []);
            setTallas(tallasData || []);
            setColores(coloresData || []);
        } catch (error) {
            console.error("Error cargando inventario:", error);
        }
    };

    const handleAddStock = async () => {
        if (!newStock.idTalla || !newStock.idColor || !newStock.cantidad) {
            alert("Por favor completa todos los campos");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                stock: parseInt(newStock.cantidad),
                producto: { idProducto: idProducto },
                talla: { idTalla: parseInt(newStock.idTalla) },
                color: { idColor: parseInt(newStock.idColor) }
            };

            // Tu backend está configurado para actualizar si ya existe la combinación, o crear si no.
            await apiCall('/inventario', 'POST', payload);
            
            setMsg({ type: 'success', text: 'Stock actualizado correctamente' });
            setNewStock({ idTalla: '', idColor: '', cantidad: '' }); // Limpiar form
            loadData(); // Recargar tabla
        } catch (error) {
            console.error(error);
            setMsg({ type: 'danger', text: 'Error al guardar el stock' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (idInventario) => {
        if(!window.confirm("¿Eliminar esta variante de stock?")) return;
        try {
            await apiCall(`/inventario/${idInventario}`, 'DELETE');
            loadData();
        } catch (error) {
            alert("Error al eliminar");
        }
    };

    return (
        // Usamos la clase del CSS
        <div className="admin-inventario-container">
            <h5>📦 Gestión de Stock (Variantes)</h5>
            {msg && <Alert variant={msg.type} onClose={() => setMsg(null)} dismissible>{msg.text}</Alert>}

            {/* Usamos la clase del CSS */}
            <div className="stock-form-container">
                <Row className="g-2 align-items-end">
                    {/* ... (Inputs del formulario siguen igual) ... */}
                </Row>
                <Form.Text className="text-muted">
                    * Si la combinación Talla/Color ya existe, se actualizará la cantidad total.
                </Form.Text>
            </div>

            <Table size="sm" bordered hover className="text-center mt-3 align-middle">
                <thead className="table-secondary">
                    <tr>
                        <th>Talla</th>
                        <th>Color</th>
                        <th>Stock Actual</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {inventario.length === 0 ? (
                        <tr><td colSpan="4">No hay stock asignado aún.</td></tr>
                    ) : (
                        inventario.map(item => (
                            <tr key={item.id_inventario}>
                                <td>{item.talla?.valorTalla}</td>
                                <td>
                                    {item.color?.nombreColor}
                                    {/* Usamos la clase .color-dot e inyectamos el color dinámico */}
                                    <span 
                                        className="color-dot"
                                        style={{ backgroundColor: item.color?.hexColor || '#ccc' }}
                                    ></span>
                                </td>
                                <td>
                                    {/* Usamos la clase .stock-badge */}
                                    <Badge bg={item.stock > 0 ? 'primary' : 'danger'} className="stock-badge">
                                        {item.stock} u.
                                    </Badge>
                                </td>
                                <td>
                                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(item.id_inventario)}>
                                        &times;
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </div>
    );
}
export default AdminInventario;