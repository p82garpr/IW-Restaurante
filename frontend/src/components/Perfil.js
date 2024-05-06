import React, { useEffect, useState } from 'react';
import { Container, Button } from 'reactstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PerfilContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const PerfilBox = styled.div`
  background-color: #f5f5f5;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Text = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  background-color: #1a237e;
  border-color: #1a237e;
  font-size: 1.2rem;
  margin-right: 10px;

  &:hover {
    background-color: #3f51b5;
    border-color: #3f51b5;
  }
`;

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Obtener la información del usuario actual al cargar el componente
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

  return (
    <PerfilContainer>
      {usuario ? (
      <PerfilBox>
        <Title>Perfil de Usuario</Title>
        {usuario && (
          <>
            <Text>Nombre: {usuario.nombre}</Text>
            <Text>Correo electrónico: {usuario.nombre_usuario}</Text>
          </>
        )}
        <ButtonContainer>
          <Link to="/EditarPerfil"><StyledButton>Editar Perfil</StyledButton></Link>
          <Link to="/Historial"><StyledButton>Ver Historial</StyledButton></Link>
        </ButtonContainer>
      </PerfilBox>):( 
        <p>Debes iniciar sesión para ver tu perfil</p>
      )}
    </PerfilContainer>
  );
};

export default Perfil;
