import React from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import styled from 'styled-components';
import perfilData from '../data/perfilData.json';

const PerfilContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledCard = styled(Card)`
  width: 400px;
`;

const StyledCardBody = styled(CardBody)`
  text-align: center;
`;

const StyledTitle = styled(CardTitle)`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const StyledText = styled(CardText)`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  background-color: #1a237e;
  border-color: #1a237e;
  font-size: 1.2rem;

  &:hover {
    background-color: #3f51b5;
    border-color: #3f51b5;
  }
`;

const Perfil = () => {
  return (
    <PerfilContainer>
      <StyledCard>
        <StyledCardBody>
          <StyledTitle>Perfil de Usuario</StyledTitle>
          <StyledText>Nombre: {perfilData.nombre}</StyledText>
          <StyledText>Correo electrónico: {perfilData.email}</StyledText>
          <StyledText>Dirección: {perfilData.direccion}</StyledText>
          <StyledText>Teléfono: {perfilData.telefono}</StyledText>
          <StyledButton>Editar Perfil</StyledButton>
        </StyledCardBody>
      </StyledCard>
    </PerfilContainer>
  );
};

export default Perfil;
