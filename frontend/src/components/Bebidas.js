import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import styled from 'styled-components';
import bebidasData from '../data/bebidasData.json';

const BebidasContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

const BebidasCard = styled(Card)`
  width: 300px;
  margin: 20px;
`;

const BebidasImage = styled(CardImg)`
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const BebidasTitle = styled(CardTitle)`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const BebidasDescription = styled(CardText)`
  font-size: 1.2rem;
`;

const BebidasPrice = styled(CardText)`
  color: green;
  font-size: 1.2rem;
  text-align: center;
  font-weight: bold;
  margin-top: auto; /* Alinea el precio en la parte inferior de la tarjeta */
`;

const BebidasButton = styled(Button)`
  background-color: #1a237e;
  border-color: #1a237e;
  font-size: 1.2rem;
  
  &:hover {
    background-color: #3f51b5;
    border-color: #3f51b5;
  }
`;

const BebidasCardBody = styled(CardBody)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const BebidasContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Para que el contenido pueda expandirse */
`;

const Bebidas = () => {
  return (
    <BebidasContainer>
      {bebidasData.map(bebida => (
        <BebidasCard key={bebida.id}>
          <BebidasImage top width="100%" src={bebida.image} alt={bebida.name} />
          <BebidasCardBody>
            <BebidasContent>
              <BebidasTitle>{bebida.name}</BebidasTitle>
              <BebidasDescription>{bebida.description}</BebidasDescription>
            </BebidasContent>
            <BebidasPrice>{bebida.price} €</BebidasPrice>
            <BebidasButton>Agregar al carrito</BebidasButton>
          </BebidasCardBody>
        </BebidasCard>
      ))}
    </BebidasContainer>
  );
};

export default Bebidas;
