import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import FormField from '../components/molecules/FormField.jsx';
import Button from '../components/atoms/Button.jsx';
import '../styles/pages/Registro.css';

// componente funcional de React que representa la pagina de registro de usuario
// utiliza React Hook Form para la gestion y validación del formulario
// incluye campos para nombre, correo electronico, contraseña y confirmación de contraseña
// aplica estilos personalizados desde un archivo CSS especifico para esta página
function Registro() {
  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm();

  const onSubmit = (data) => {
    console.log({ nombre: data.nombre, email: data.email }); 
    alert('¡Registro exitoso!');
    reset();
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm registro-card">
            <Card.Body className="p-4">
              <h1 className="text-center mb-4">Registro de Usuario</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                  label="Nombre Completo"
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
                  validationRules={{ required: "El correo es obligatorio" }}
                  placeholder="tu@correo.com"
                />

                <FormField
                  label="Contraseña"
                  name="password"
                  type="password"
                  register={register}
                  errors={errors}
                  validationRules={{ required: "La contraseña es obligatoria" }}
                  placeholder="Crea una contraseña"
                />

                <FormField
                  label="Confirmar Contraseña"
                  name="confirmPassword"
                  type="password"
                  register={register}
                  errors={errors}
                  validationRules={{
                    required: "Debes confirmar la contraseña",
                    validate: value =>
                      value === getValues("password") || "Las contraseñas no coinciden"
                  }}
                  placeholder="Repite la contraseña"
                />

                <div className="d-grid mt-4">
                  <Button type="submit">
                    Registrar
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

export default Registro;