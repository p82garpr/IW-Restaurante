import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import styled from 'styled-components';
import principalesData from '../data/principalesData.json';

const PrincipalesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

const PrincipalesCard = styled(Card)`
  width: 300px;
  margin: 20px;
`;

const PrincipalesImage = styled(CardImg)`
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const PrincipalesTitle = styled(CardTitle)`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const PrincipalesDescription = styled(CardText)`
  font-size: 1.2rem;
`;

const PrincipalesPrice = styled(CardText)`
  color: green;
  font-size: 1.2rem;
  text-align: center;
  font-weight: bold;
  margin-top: auto; /* Alinea el precio en la parte inferior de la tarjeta */
`;

const PrincipalesButton = styled(Button)`
  background-color: #1a237e;
  border-color: #1a237e;
  font-size: 1.2rem;
  
  &:hover {
    background-color: #3f51b5;
    border-color: #3f51b5;
  }
`;

const PrincipalesCardBody = styled(CardBody)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const PrincipalesContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Para que el contenido pueda expandirse */
`;

const Principales = () => {
  return (
    <PrincipalesContainer>
      {principalesData.map(plato => (
        <PrincipalesCard key={plato.id}>
          <PrincipalesImage top width="100%" src={plato.image} alt={plato.name} />
          <PrincipalesCardBody>
            <PrincipalesContent>
              <PrincipalesTitle>{plato.name}</PrincipalesTitle>
              <PrincipalesDescription>{plato.description}</PrincipalesDescription>
            </PrincipalesContent>
            <PrincipalesPrice>{plato.price} €</PrincipalesPrice>
            <PrincipalesButton>Agregar al carrito</PrincipalesButton>
          </PrincipalesCardBody>
        </PrincipalesCard>
      ))}
    </PrincipalesContainer>
  );
};

export default Principales;
