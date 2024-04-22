import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

const RegistroContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const RegistroBox = styled.div`
  background-color: #f5f5f5;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const RegistroTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const RegistroForm = styled(Form)`
  margin-bottom: 20px;
`;

const RegistroFormGroup = styled(FormGroup)`
  margin-bottom: 20px;
`;

const RegistroLabel = styled(Label)`
  font-size: 1.2rem;
`;

const RegistroInput = styled(Input)`
  font-size: 1.2rem;
`;

const RegistroButton = styled(Button)`
  background-color: #1a237e;
  border-color: #1a237e;
  font-size: 1.2rem;

  &:hover {
    background-color: #3f51b5;
    border-color: #3f51b5;
  }
`;

const Registro = () => {
  const [usuario, setUsuario] = useState({
    correo: '',
    nombre: '',
    apellido: '',
    contraseña: '',
    fecha_nacimiento: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setUsuario(prevUsuario => ({
      ...prevUsuario,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/registro', usuario);
      alert('Registro exitoso');
      // Redirigir al usuario a la página de inicio de sesión u otra página
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error en el registro');
    }
  };

  return (
    <RegistroContainer>
      <RegistroBox>
        <RegistroTitle>Registro</RegistroTitle>
        <RegistroForm onSubmit={handleSubmit}>
          <RegistroFormGroup>
            <RegistroLabel for="correo">Correo electrónico</RegistroLabel>
            <RegistroInput
              type="email"
              name="correo"
              id="correo"
              value={usuario.correo}
              onChange={handleChange}
              required
            />
          </RegistroFormGroup>
          <RegistroFormGroup>
            <RegistroLabel for="nombre">Nombre</RegistroLabel>
            <RegistroInput
              type="text"
              name="nombre"
              id="nombre"
              value={usuario.nombre}
              onChange={handleChange}
              required
            />
          </RegistroFormGroup>
          <RegistroFormGroup>
            <RegistroLabel for="apellido">Apellido</RegistroLabel>
            <RegistroInput
              type="text"
              name="apellido"
              id="apellido"
              value={usuario.apellido}
              onChange={handleChange}
              required
            />
          </RegistroFormGroup>
          <RegistroFormGroup>
            <RegistroLabel for="contraseña">Contraseña</RegistroLabel>
            <RegistroInput
              type="password"
              name="contraseña"
              id="contraseña"
              value={usuario.contraseña}
              onChange={handleChange}
              required
            />
          </RegistroFormGroup>
          <RegistroFormGroup>
            <RegistroLabel for="fecha_nacimiento">Fecha de Nacimiento</RegistroLabel>
            <RegistroInput
              type="date"
              name="fecha_nacimiento"
              id="fecha_nacimiento"
              value={usuario.fecha_nacimiento}
              onChange={handleChange}
              required
            />
          </RegistroFormGroup>
          <RegistroButton color="primary" block>Registrarse</RegistroButton>
        </RegistroForm>
      </RegistroBox>
    </RegistroContainer>
  );
};

export default Registro;
