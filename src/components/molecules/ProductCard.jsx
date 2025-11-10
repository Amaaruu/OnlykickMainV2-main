import React from 'react'; 
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from '../atoms/Button.jsx'; 
import Image from '../atoms/Image.jsx';
import Text from '../atoms/Text.jsx';
import '../../styles/molecules/ProductCard.css';

function ProductCard({ producto, addToCart }) {
 return (
   <Card className="h-100 text-center shadow-sm product-card">
     <Link to={`/producto/${producto.id}`}>
       <Image 
         src={producto.imagen} 
         alt={producto.nombre} 
       />
     </Link>
     <Card.Body>
       <Text as="h5" variant="title">
         {producto.nombre}
       </Text>
       <Text variant="price">
         ${producto.precio.toLocaleString('es-CL')}
       </Text>
     </Card.Body>
     <Card.Footer>
       <Button onClick={() => addToCart(producto)}>
         Añadir al Carrito
       </Button>
     </Card.Footer>
   </Card>
 );
}

export default ProductCard;