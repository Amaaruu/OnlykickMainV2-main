import React from 'react';
import { Card, Button as BootstrapButton } from 'react-bootstrap';
import '../../styles/molecules/CartSummary.css';
import Text from '../../components/atoms/Text.jsx'

// Su funcion es mostrar el resumen del carrito
// Recibe el subtotal para calcular el total
function CartSummary({ subtotal }) {
    return (
        <Card>
            <Card.Body>
                <Text as="h5" className="summary-card-title">Resumen del Pedido</Text>
                <hr />
                <div className="d-flex justify-content-between">
                    <Text>Subtotal</Text>
                    <Text className="fw-bold">${subtotal.toLocaleString('es-CL')}</Text>
                </div>
                <div className="d-flex justify-content-between">
                    <Text>Envío</Text>
                    <Text className="fw-bold">Gratis</Text>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                    <Text as="h6">Total</Text>
                    <Text as="h6" className="fw-bold">${subtotal.toLocaleString('es-CL')}</Text>
                </div>
                <div className="d-grid mt-3">
                    <BootstrapButton variant="danger" disabled={subtotal === 0}>
                        Proceder al Pago
                    </BootstrapButton>
                </div>
            </Card.Body>
        </Card>
    );
}

export default CartSummary;