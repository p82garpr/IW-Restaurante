import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

const RegistroContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const RegistroForm = styled(Form)`
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const RegistroTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
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
      setUsuario({
        correo: '',
        nombre: '',
        apellido: '',
        contraseña: '',
        fecha_nacimiento: ''
      });
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error en el registro');
    }
  };

  return (
    <RegistroContainer>
      <RegistroForm onSubmit={handleSubmit}>
        <RegistroTitle>Registro</RegistroTitle>
        <FormGroup>
          <Label for="correo">Correo electrónico</Label>
          <Input
            type="email"
            name="correo"
            id="correo"
            value={usuario.correo}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="nombre">Nombre</Label>
          <Input
            type="text"
            name="nombre"
            id="nombre"
            value={usuario.nombre}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="apellido">Apellido</Label>
          <Input
            type="text"
            name="apellido"
            id="apellido"
            value={usuario.apellido}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="contraseña">Contraseña</Label>
          <Input
            type="password"
            name="contraseña"
            id="contraseña"
            value={usuario.contraseña}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="fecha_nacimiento">Fecha de Nacimiento</Label>
          <Input
            type="date"
            name="fecha_nacimiento"
            id="fecha_nacimiento"
            value={usuario.fecha_nacimiento}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Button color="primary" block>Registrarse</Button>
      </RegistroForm>
    </RegistroContainer>
  );
};

export default Registro;
