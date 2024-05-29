import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FormularioContainer = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const TituloFormulario = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const CampoFormulario = styled.div`
  margin-bottom: 15px;
  text-align: left;
`;

const Etiqueta = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Boton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-3px);
  }
`;

const MensajeError = styled.p`
  color: red;
  font-size: 0.9rem;
`;

const MensajeExito = styled.p`
  color: green;
  font-size: 0.9rem;
`;

const CrearMesa = () => {
  const [numeroMesa, setNumeroMesa] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const obtenerUsuarioActual = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/usuarios/auth/sesion', { withCredentials: true });
        setUsuario(response.data);
      } catch (error) {
        console.error('Error al obtener información del usuario:', error);
      }
    };

    obtenerUsuarioActual();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/mesa', {
        numero_mesa: numeroMesa,
        estado: 'Libre',
        capacidad,
      });

      if (response.status === 200) {
        setMensaje({ type: 'success', text: 'La mesa ha sido creada' });
        setNumeroMesa('');
        setCapacidad('');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMensaje({ type: 'error', text: 'Ya existe una mesa con este número' });
      } else {
        setMensaje({ type: 'error', text: 'Error al crear la mesa' });
      }
    }
  };

  return (
    usuario && usuario.privilegio === 1 ? (
      <FormularioContainer>
        <TituloFormulario>Crear Nueva Mesa</TituloFormulario>
        <form onSubmit={handleSubmit}>
          <CampoFormulario>
            <Etiqueta>Número de Mesa</Etiqueta>
            <Input
              type="number"
              value={numeroMesa}
              onChange={(e) => setNumeroMesa(e.target.value)}
              required
            />
          </CampoFormulario>
          <CampoFormulario>
            <Etiqueta>Capacidad</Etiqueta>
            <Input
              type="number"
              value={capacidad}
              onChange={(e) => setCapacidad(e.target.value)}
              required
            />
          </CampoFormulario>
          {mensaje && (
            mensaje.type === 'error' ? (
              <MensajeError>{mensaje.text}</MensajeError>
            ) : (
              <MensajeExito>{mensaje.text}</MensajeExito>
            )
          )}
          <Boton type="submit">Crear Mesa</Boton>
        </form>
      </FormularioContainer>
    ) : (
      <p>No autorizado</p> // Redirección a error 403 si es necesario
    )
  );
};

export default CrearMesa;
