import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import FormField from '../components/molecules/FormField.jsx';
import Button from '../components/atoms/Button.jsx';
import '../styles/pages/Registro.css';

import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm();
  
  // OBTENEMOS LA FUNCIÓN registerUser DEL CONTEXTO
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  // MODIFICAMOS LA FUNCIÓN ONSUBMIT PARA QUE SEA ASÍNCRONA Y LLAME AL BACKEND
  const onSubmit = async (data) => {
    try {
      // Llamamos a la función real que se comunica con Spring Boot
      await registerUser(data);
      
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      reset();
      // Redirigir al login para que el usuario entre
      navigate('/login');
      
    } catch (error) {
      console.error("Error en el registro:", error);
      alert('Hubo un error al registrar el usuario. Intenta nuevamente.');
    }
  };

  return (
    <Container className="my-5">
        <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm registro-card">
            <Card.Body className="p-4">
              <h1 className="text-center mb-4">Registro de Usuario</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* ... tus campos FormField ... */}
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