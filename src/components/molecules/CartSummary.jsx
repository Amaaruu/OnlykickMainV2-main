import React from 'react';
import { Card, Button as BootstrapButton } from 'react-bootstrap';
import '../../styles/molecules/CartSummary.css';
import Text from '../../components/atoms/Text.jsx'

// Recibimos una nueva prop: onCheckout
function CartSummary({ subtotal, onCheckout }) {
    return (
        <Card>
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <Text as="h6">Total</Text>
                    <Text as="h6" className="fw-bold">${subtotal.toLocaleString('es-CL')}</Text>
                </div>
                <div className="d-grid mt-3">
                    {/* Conectamos el onClick */}
                    <BootstrapButton 
                        variant="danger" 
                        disabled={subtotal === 0}
                        onClick={onCheckout} 
                    >
                        Proceder al Pago
                    </BootstrapButton>
                </div>
            </Card.Body>
        </Card>
    );
}

export default CartSummary;