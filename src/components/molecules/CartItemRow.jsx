import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap'; // Usamos el de bootstrap por el estilo outline
import Image from '../../components/atoms/Image.jsx';
import Text from '../../components/atoms/Text.jsx';
import '../../styles/molecules/CartSummary.css';

// Su funcion es representar una fila de item en el carrito
// Recibe el item y la funcion para removerlo
function CartItemRow({ item, removeFromCart }) {
    return (
        <tr>
            <td>
                <Image src={item.imagen} alt={item.nombre} className="cart-item-image" />
            </td>
            <td>
                <Text>{item.nombre}</Text>
            </td>
            <td>
                <Text>${item.precio.toLocaleString('es-CL')}</Text>
            </td>
            <td>
                <BootstrapButton 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => removeFromCart(item.id)}>
                    Eliminar
                </BootstrapButton>
            </td>
        </tr>
    );
}

export default CartItemRow;