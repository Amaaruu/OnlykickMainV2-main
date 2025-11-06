import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../styles/organisms/Footer.css';

// su funcion es un footer
// que contiene informacion de derechos reservados y enlaces rapidos
function Footer() {
    return (
        <footer className="text-center py-4 bg-dark text-white mt-auto">
            <Container>
                <Row className="align-items-center">
                    <Col md={6} className="text-md-start mb-3 mb-md-0">
                        <h5 className="white-text">OnlyKick</h5>
                        <p className="mb-0">&copy; {new Date().getFullYear()} OnlyKick. Todos los derechos reservados.</p>
                        <p>Hecho con <span className="heart-icon">&hearts;</span> por OnlyKick</p>
                    </Col>
                    <Col md={6} className="text-md-end">
                        <h5 className="white-text">Enlaces Rápidos</h5>
                        <ul className="list-unstyled">
                            {/*Usamos la clase para los enlaces*/}
                            <li><a href="#!" className="footer-link">Política de Privacidad</a></li>
                            <li><a href="#!" className="footer-link">Términos y Condiciones</a></li>
                            <li><Link to="/contacto" className="footer-link">Contacto</Link></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;