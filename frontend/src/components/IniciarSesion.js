import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

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
    correo: '',
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
      const response = await axios.post('http://localhost:4000/api/iniciarsesion', credenciales);
      alert('Inicio de sesión exitoso');
      console.log(response.data); // Puedes hacer algo con la respuesta, como almacenar el token de autenticación
      // Redirigir al usuario a la página principal o a otra página
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      alert('Error en el inicio de sesión');
    }
  };

  return (
    <IniciarSesionContainer>
      <IniciarSesionBox>
        <IniciarSesionTitle>Iniciar Sesión</IniciarSesionTitle>
        <IniciarSesionForm onSubmit={handleSubmit}>
          <IniciarSesionFormGroup>
            <IniciarSesionLabel for="correo">Correo electrónico</IniciarSesionLabel>
            <IniciarSesionInput
              type="email"
              name="correo"
              id="correo"
              value={credenciales.correo}
              onChange={handleChange}
              required
            />
          </IniciarSesionFormGroup>
          <IniciarSesionFormGroup>
            <IniciarSesionLabel for="contraseña">Contraseña</IniciarSesionLabel>
            <IniciarSesionInput
              type="password"
              name="contraseña"
              id="contraseña"
              value={credenciales.contraseña}
              onChange={handleChange}
              required
            />
          </IniciarSesionFormGroup>
          <IniciarSesionButton color="primary" block>Iniciar Sesión</IniciarSesionButton>
        </IniciarSesionForm>
      </IniciarSesionBox>
    </IniciarSesionContainer>
  );
};

export default IniciarSesion;
