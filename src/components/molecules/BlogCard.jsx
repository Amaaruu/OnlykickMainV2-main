import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Image from '../atoms/Image.jsx';
import Text from '../atoms/Text.jsx';
import '../../styles/molecules/BlogCard.css';

// Su funcion es recibir un blog y mostrar su contenido en una Card
// Recibe un objeto blog con {id, titulo, contenido, imagen, fecha}
function BlogCard({ blog }) {
    return (
        <Card className="mb-4 shadow-sm">
          <Row className="g-0">
            <Col md={5}>
              <Image 
                src={blog.imagen} 
                alt={blog.titulo}
                className="blog-card-image"
              />
            </Col>
            <Col md={7}>
              <Card.Body>
                <Text as="h3" variant="title">{blog.titulo}</Text>
                <Text>{blog.contenido}</Text>
                <Card.Footer className="text-muted bg-white border-0 ps-0 mt-3">
                  Publicado el: {new Date(blog.fecha).toLocaleDateString('es-ES')}
                </Card.Footer>
              </Card.Body>
            </Col>
          </Row>
        </Card>
    );
}

export default BlogCard;