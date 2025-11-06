import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import '../styles/pages/Nosotros.css';

// Componente funcional de React que representa la página "Nosotros"
// Utiliza componentes de React Bootstrap para el diseño y la estructura
// Incluye una imagen y texto descriptivo sobre la historia de la tienda
// Aplica estilos personalizados desde un archivo CSS específico para esta página
function Nosotros() {
  return (
    <Container className="my-5">
      <Row className="align-items-center">
        <Col md={6} className="mb-4 mb-md-0">
          <Image 
            src="/img/OnlyKick.jpg.jpg" 
            alt="Tienda OnlyKick" 
            fluid
            rounded
            className="shadow"
          />
        </Col>
        <Col md={6}>
          <h1 className="mb-3">Nuestra Historia</h1>
          <p className="lead">
            OnlyKick nació de la pasión de un grupo de estudiantes por las zapatillas. Lo que empezó como un simple proyecto universitario, hoy se convirtió en un lugar pensado para todos los que viven y disfrutan la cultura sneaker.
          </p>
          {/*Llamamos a nuestra clase personalizada*/}
          <p className="about-text">
            Acá vas a encontrar una selección de zapatillas desde los clásicos que nunca pasan de moda hasta esas colaboraciones únicas que todos quieren tener. Porque cada par tiene una historia que contar, y estamos aquí para que encuentres la tuya.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Nosotros;