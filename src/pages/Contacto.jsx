import React from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import FormField from '../components/molecules/FormField.jsx';
import Button from '../components/atoms/Button.jsx';
import '../styles/pages/Contacto.css';

// su funcion es renderizar un formulario de contacto
// y manejar su envio con react-hook-form y bootstrap
// y mostrar mensajes de error si los hay
// y un mensaje de exito al enviar el formulario
// y limpiar el formulario al enviar
function Contacto() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert('¡Mensaje enviado con éxito!');
    reset();
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm contact-card">
            <Card.Body>
              <h1 className="text-center mb-4">Contáctanos</h1>
              {/* Usamos un form, ya que react-hook-form se encarga de todo*/}
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                  label="Nombre"
                  name="nombre"
                  register={register}
                  errors={errors}
                  validationRules={{ required: "El nombre es obligatorio" }}
                  placeholder="Ingresa tu nombre"
                />

                <FormField
                  label="Correo Electrónico"
                  name="email"
                  type="email"
                  register={register}
                  errors={errors}
                  validationRules={{ 
                    required: "El correo es obligatorio",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "El formato del correo no es válido"
                    } 
                  }}
                  placeholder="tu@correo.com"
                />

                <FormField
                  label="Mensaje"
                  name="mensaje"
                  as="textarea" // Le decimos a nuestro atomo Input que se renderice como un textarea
                  rows={4}
                  register={register}
                  errors={errors}
                  validationRules={{ required: "El mensaje no puede estar vacío" }}
                  placeholder="Escribe tu mensaje aquí"
                />

                <div className="d-grid mt-3">
                  {/* Usamos nuestro atomo de Boton*/}
                  <Button type="submit">
                    Enviar Mensaje
                  </Button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Contacto;