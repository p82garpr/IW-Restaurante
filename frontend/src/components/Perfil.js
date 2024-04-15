import React from 'react';
import { Container, Button } from 'reactstrap';
import styled from 'styled-components';
import perfilData from '../data/perfilData.json';
import { Link } from 'react-router-dom';


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
  return (
    <PerfilContainer>
      <PerfilBox>
        <Title>Perfil de Usuario</Title>
        <Text>Nombre: {perfilData.nombre}</Text>
        <Text>Correo electrónico: {perfilData.email}</Text>
        <ButtonContainer>
          <Link to="/EditarPerfil"><StyledButton>Editar Perfil</StyledButton></Link>
          <Link to="/Historial"><StyledButton>Ver Historial</StyledButton></Link>
        </ButtonContainer>
      </PerfilBox>
    </PerfilContainer>
  );
};

export default Perfil;
