import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';

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
    contraseña: '',
    mesaId: ''
  });

  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const mesaNumero = query.get('mesa');

  // Obtener mesaId basado en mesaNumero cada vez que mesaNumero cambia
  useEffect(() => {
    const fetchMesaId = async () => {
      try {
        const mesaResponse = await axios.get('http://localhost:4000/api/mesa', { withCredentials: true });
        const mesa = mesaResponse.data.find(m => m.numero_mesa === parseInt(mesaNumero, 10));

        if (mesa) {
          setCredenciales(prevCredenciales => ({
            ...prevCredenciales,
            mesaId: mesa._id // Agregar el ID de la mesa a las credenciales
          }));
        } else {
          console.error('Mesa no encontrada');
        }
      } catch (error) {
        console.error('Error al obtener la mesa:', error.response?.data?.message || error.message);
      }
    };
    const fetchMesaIdNull = async () => {
      try {
        const mesaResponse = await axios.get('http://localhost:4000/api/mesa', { withCredentials: true });
        const mesa = mesaResponse.data.find(m => m.numero_mesa === 0);

        if (mesa) {
          setCredenciales(prevCredenciales => ({
            ...prevCredenciales,
            mesaId: mesa._id // Agregar el ID de la mesa a las credenciales
          }));
        } else {
          console.error('Mesa no encontrada');
        }
      } catch (error) {
        console.error('Error al obtener la mesa:', error.response?.data?.message || error.message);
      }
    };

    if (mesaNumero) {
      fetchMesaId();
    }else if(!mesaNumero && credenciales.nombre_usuario === 'p82ceali@uco.es'){
      fetchMesaIdNull();
    }else{
      console.error('No se ha especificado el número de mesa');
    }
  }, [credenciales.nombre_usuario, mesaNumero]);

  // Actualizar el estado de credenciales cuando cambian los inputs
  const handleChange = e => {
    const { name, value } = e.target;
    setCredenciales(prevCredenciales => ({
      ...prevCredenciales,
      [name]: value
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      console.log('Enviando credenciales:', credenciales);

      // Construir el cuerpo de la solicitud con las credenciales y el ID de la mesa
      const requestBody = {
        nombre_usuario: credenciales.nombre_usuario,
        contraseña: credenciales.contraseña,
        mesa: credenciales.mesaId // Incluir el ID de la mesa en el cuerpo de la solicitud
      };

      // Enviar solicitud POST para autenticación
      const response = await axios.post('http://localhost:4000/api/usuarios/auth/login', requestBody, { withCredentials: true });
      console.log('Respuesta de autenticación:', response);

      if (response.status === 200) {
        console.log('Autenticación exitosa');

        // Actualizar el estado de la mesa a 'ocupada' si la autenticación es exitosa
        const updateResponse = await axios.put(`http://localhost:4000/api/mesa/${credenciales.mesaId}`, {
          estado: 'ocupada'
        }, { withCredentials: true });

        console.log('Respuesta de actualización del estado de la mesa:', updateResponse);

        if (updateResponse.status === 200) {
          console.log('Estado de la mesa actualizado');
         // Redirigir a la página de inicio u otra ruta deseada
         window.location.href = '/';
        } else {
          console.error('Error en la actualización del estado de la mesa:', updateResponse.status);
        }
      } else {
        console.error('Error en la autenticación:', response.status);
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error.response?.data?.message || error.message);
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
