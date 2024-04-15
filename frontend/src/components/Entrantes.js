import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import styled from 'styled-components';
import entrantesData from '../data/entrantesData.json';

const EntrantesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

const EntrantesCard = styled(Card)`
  width: 300px;
  margin: 20px;
`;

const EntrantesImage = styled(CardImg)`
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const EntrantesTitle = styled(CardTitle)`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const EntrantesDescription = styled(CardText)`
  font-size: 1.2rem;
`;

const EntrantesPrice = styled(CardText)`
  color: green;
  font-size: 1.2rem;
  text-align: center;
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;

`;

const EntrantesButton = styled(Button)`
  background-color: #1a237e;
  border-color: #1a237e;
  font-size: 1.2rem;
  
  &:hover {
    background-color: #3f51b5;
    border-color: #3f51b5;
  }
`;

const EntrantesCardBody = styled(CardBody)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Entrantes = () => {
  return (
    <EntrantesContainer>
      {entrantesData.map(entrante => (
        <EntrantesCard key={entrante.id}>
          <EntrantesImage top width="100%" src={entrante.image} alt={entrante.name} />
          <EntrantesCardBody>
            <div>
              <EntrantesTitle>{entrante.name}</EntrantesTitle>
              <EntrantesDescription>{entrante.description}</EntrantesDescription>
              <EntrantesPrice>{entrante.price} €</EntrantesPrice>
            </div>
            <EntrantesButton>Agregar al carrito</EntrantesButton>
          </EntrantesCardBody>
        </EntrantesCard>
      ))}
    </EntrantesContainer>
  );
};

export default Entrantes;
