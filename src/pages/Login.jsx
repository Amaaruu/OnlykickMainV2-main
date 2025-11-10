import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import FormField from '../components/molecules/FormField.jsx';
import Button from '../components/atoms/Button.jsx';
import '../styles/pages/Login.css';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

// su funcion es un componente funcional de React que representa una pagina de inicio de sesion
// utiliza varios componentes y bibliotecas para crear un formulario de inicio de sesion con validacion
// y estilos personalizados
// utiliza react-bootstrap para el diseño y los estilos, react-hook-form para la gestion del formulario
// y componentes personalizados para los campos del formulario y el boton
function Login() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const {login} = useAuth();
  const Navigate = useNavigate();

  const onSubmit =  async (data) => {
    try {
      // llamamos a la funcion de login del contexto de autenticacion
      await login(data.email, data.password);
      alert("Inicio de sesion exitoso");
      reset();

      //redirigimos al usuario a la pagina principal
      Navigate("/");
    } catch (error) {
      console.error("Error durante el inicio de sesion:", error);
      alert("Fallo en el inicio de sesion. Por favor, verifica tus credenciales.");
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={5}>
          <Card className="shadow-sm login-card">
            <Card.Body className="p-4">
              <h1 className="text-center mb-4">Iniciar Sesión</h1>
              {/*Usamos un form nativo*/}
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                  label="Correo Electrónico"
                  name="email"
                  type="email"
                  register={register}
                  errors={errors}
                  validationRules={{ 
                    required: "El correo es obligatorio",
                    pattern: {
                      value: /@duocuc\.cl$|@profesor\.duoc\.cl$/,
                      message: "El correo debe ser @duocuc.cl o @profesor.duoc.cl"
                    } 
                  }}
                  placeholder="tu@correo.com"
                />

                <FormField
                  label="Contraseña"
                  name="password"
                  type="password"
                  register={register}
                  errors={errors}
                  validationRules={{ 
                    required: "La contraseña es obligatoria",
                    minLength: {
                      value: 4,
                      message: "La contraseña debe tener al menos 4 caracteres"
                    },
                    maxLength: {
                      value: 10,
                      message: "La contraseña no debe exceder los 10 caracteres"
                    }
                  }}
                  placeholder="Ingresa tu contraseña"
                />

                <div className="d-grid mt-4">
                  {/*Usamos nuestro atomo de boton*/}
                  <Button type="submit">
                    Ingresar
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

export default Login;