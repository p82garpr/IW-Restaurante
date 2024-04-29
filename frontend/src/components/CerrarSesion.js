import React from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import axios from 'axios'; // Importa axios para hacer solicitudes HTTP

const CerrarSesionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const CerrarSesionBox = styled.div`
  background-color: #f5f5f5;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CerrarSesionTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CerrarSesionButton = styled(Button)`
  background-color: #d32f2f;
  border-color: #d32f2f;
  font-size: 1.2rem;

  &:hover {
    background-color: #ff5252;
    border-color: #ff5252;
  }
`;

const CerrarSesion = () => {

  const handleCerrarSesion = async () => {
    try {
      // Realiza una solicitud POST a la ruta de cierre de sesión en la API
      const response = await axios.post('http://localhost:4000/api/logout');
      console.log(response.data.message); // Mensaje de éxito de cierre de sesión
      alert('Sesión cerrada exitosamente');
      window.location.replace('/'); // Redirige al usuario a la página de inicio
    } catch (error) {
      console.error('Error al cerrar sesión:', error.response.data.message);
      alert('Ocurrió un error al cerrar la sesión');
    }
  };

  return (
    <CerrarSesionContainer>
      <CerrarSesionBox>
        <CerrarSesionTitle>Cerrar Sesión</CerrarSesionTitle>
        <CerrarSesionButton onClick={handleCerrarSesion} color="danger">Cerrar Sesión</CerrarSesionButton>
      </CerrarSesionBox>
    </CerrarSesionContainer>
  );
};

export default CerrarSesion;
