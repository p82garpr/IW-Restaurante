import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios'; // Importa axios para hacer solicitudes HTTP


const IniciarSesionContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const IniciarSesionBox = styled.div`
  background-color: #f5f5f5;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const IniciarSesionTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const IniciarSesionForm = styled(Form)`
  margin-bottom: 20px;
`;

const IniciarSesionFormGroup = styled(FormGroup)`
  margin-bottom: 20px;
`;

const IniciarSesionLabel = styled(Label)`
  font-size: 1.2rem;
`;

const IniciarSesionInput = styled(Input)`
  font-size: 1.2rem;
`;

const IniciarSesionButton = styled(Button)`
  background-color: #1a237e;
  border-color: #1a237e;
  font-size: 1.2rem;

  &:hover {
    background-color: #3f51b5;
    border-color: #3f51b5;
  }
`;

const IniciarSesion = () => {
  const [credenciales, setCredenciales] = useState({
    nombre_usuario: '',
    contraseña: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setCredenciales(prevCredenciales => ({
      ...prevCredenciales,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Realizar solicitud POST a la ruta de inicio de sesión en la API
      const response = await axios.post('http://localhost:4000/api/usuarios/auth/login', credenciales,{withCredentials: true});
      //console.log(response.data.message); // Mensaje de éxito de inicio de sesión
      window.location.href = '/'; // Redirigir al usuario a la página principal después de iniciar sesión
    } catch (error) {
      console.error('Error en el inicio de sesión:', error.response.data.message);
      // Manejo de errores (puedes mostrar un mensaje de error al usuario)
    }
  };

  return (
    <IniciarSesionContainer>
      <IniciarSesionBox>
        <IniciarSesionTitle>Iniciar Sesión</IniciarSesionTitle>
        <IniciarSesionForm onSubmit={handleSubmit}>
          <IniciarSesionFormGroup>
            <IniciarSesionLabel htmlFor="nombre_usuario">Nombre de usuario</IniciarSesionLabel>
            <IniciarSesionInput
              type="text"
              name="nombre_usuario"
              id="nombre_usuario"
              value={credenciales.nombre_usuario}
              onChange={handleChange}
              required
            />
          </IniciarSesionFormGroup>
          <IniciarSesionFormGroup>
            <IniciarSesionLabel htmlFor="contraseña">Contraseña</IniciarSesionLabel>
            <IniciarSesionInput
              type="password"
              name="contraseña"
              id="contraseña"
              value={credenciales.contraseña}
              onChange={handleChange}
              required
            />
          </IniciarSesionFormGroup>
          <IniciarSesionButton type="submit" color="primary" block>Iniciar Sesión</IniciarSesionButton>
        </IniciarSesionForm>
      </IniciarSesionBox>
    </IniciarSesionContainer>
  );
};

export default IniciarSesion;
