import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { apiCall } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import'../../styles/molecules/AddressForm.css'

function AddressForm({ onSuccess, onCancel }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { user } = useAuth();

    // Estados para los selectores de ubicación
    const [regiones, setRegiones] = useState([]);
    const [comunas, setComunas] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    // 1. Cargar Regiones al inicio
    useEffect(() => {
        apiCall('/regiones').then(data => setRegiones(data || [])).catch(console.error);
    }, []);

    // 2. Cargar Comunas cuando cambia la región
    useEffect(() => {
        if (selectedRegion) {
            setComunas([]); // Limpiar anteriores
            apiCall(`/comunas/region/${selectedRegion}`)
                .then(data => setComunas(data || []))
                .catch(console.error);
        } else {
            setComunas([]);
        }
    }, [selectedRegion]);

    const onSubmit = async (data) => {
        setLoading(true);
        setErrorMsg(null);

        try {
            // Estructura que espera el backend (DireccionesController)
            // Necesita objetos anidados para las Foreign Keys
            const payload = {
                calle: data.calle,
                numero: data.numero,
                infoAdicional: data.infoAdicional,
                usuario: { idUsuario: user.idUsuario },
                comuna: { idComuna: parseInt(data.idComuna) }
            };

            await apiCall('/direcciones', 'POST', payload);
            
            reset();
            // Avisamos al componente padre (Carrito) que terminamos
            if (onSuccess) onSuccess(); 

        } catch (err) {
            console.error(err);
            setErrorMsg("Error al guardar la dirección.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Región</Form.Label>
                        <Form.Select 
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            required
                        >
                            <option value="">Seleccione Región...</option>
                            {regiones.map(r => (
                                <option key={r.idRegion} value={r.idRegion}>{r.nombreRegion}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Comuna</Form.Label>
                        <Form.Select 
                            {...register("idComuna", { required: true })}
                            disabled={!selectedRegion}
                        >
                            <option value="">Seleccione Comuna...</option>
                            {comunas.map(c => (
                                <option key={c.idComuna} value={c.idComuna}>{c.nombreComuna}</option>
                            ))}
                        </Form.Select>
                        {errors.idComuna && <span className="text-danger small">Campo requerido</span>}
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={8}>
                    <Form.Group className="mb-3">
                        <Form.Label>Calle</Form.Label>
                        <Form.Control 
                            {...register("calle", { required: "La calle es obligatoria" })} 
                            placeholder="Ej: Av. Siempreviva"
                        />
                        {errors.calle && <span className="text-danger small">{errors.calle.message}</span>}
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Número</Form.Label>
                        <Form.Control 
                            {...register("numero", { required: "El número es obligatorio" })} 
                            placeholder="Ej: 742"
                        />
                        {errors.numero && <span className="text-danger small">{errors.numero.message}</span>}
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-4">
                <Form.Label>Info Adicional (Opcional)</Form.Label>
                <Form.Control 
                    {...register("infoAdicional")} 
                    placeholder="Ej: Casa de esquina, portón negro..."
                />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={onCancel} disabled={loading}>
                    Cancelar
                </Button>
                <Button type="submit" variant="success" disabled={loading}>
                    {loading ? <Spinner size="sm" animation="border"/> : 'Guardar Dirección'}
                </Button>
            </div>
        </Form>
    );
}

export default AddressForm;