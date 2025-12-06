import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap'; 
import Image from '../../components/atoms/Image.jsx';
import Text from '../../components/atoms/Text.jsx';
import '../../styles/molecules/CartItemRow.css';

// Su función es representar una fila de item en el carrito
// Recibe el item y la función ya preparada para removerlo
function CartItemRow({ item, removeFromCart }) {
    return (
        <tr>
            <td>
                <Image src={item.imagen} alt={item.nombre} className="cart-item-image" />
            </td>
            <td>
                <Text>{item.nombre}</Text>
                {/* Mostramos la talla para diferenciar items iguales con distinta talla */}
                {item.selectedTallaNombre && (
                    <small className="text-muted">
                        Talla: {item.selectedTallaNombre}
                    </small>
                )}
            </td>
            <td>
                <Text>${item.precio.toLocaleString('es-CL')}</Text>
            </td>
            <td>
                <BootstrapButton 
                    variant="outline-danger" 
                    size="sm"
                    // Al hacer click, ejecutamos la función que nos pasó el padre (Carrito.jsx)
                    // la cual ya sabe qué ID borrar.
                    onClick={removeFromCart}>
                    Eliminar
                </BootstrapButton>
            </td>
        </tr>
    );
}

export default CartItemRow;