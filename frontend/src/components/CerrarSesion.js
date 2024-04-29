import React from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { useUsuario } from '../context/AuthContext';

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
  const { logout } = useUsuario(); // Obtiene la función logout del contexto

  const handleCerrarSesion = async () => {
    try {
      // Llama a la función logout del contexto
      logout();
      // Si la llamada es exitosa, mostrar un mensaje de éxito
      alert('Sesión cerrada exitosamente');
      return window.location.replace('/');
      // Aquí puedes redirigir al usuario a la página de inicio de sesión o a otra página deseada
    } catch (error) {
      // Si hay un error, mostrar un mensaje de error
      console.error('Error al cerrar sesión:', error);
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
