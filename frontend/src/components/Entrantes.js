import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import styled from 'styled-components';
import axios from 'axios';

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

const DetallesButton = styled(Button)`
  background-color: #6200ea;
  border-color: #6200ea;
  font-size: 1rem;
  width: 100%;
  
  &:hover {
    background-color: #9c4dcc;
    border-color: #9c4dcc;
  }
`;

const Entrantes = () => {
  const [entrantesData, setEntrantes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/productos/entrante');
        setEntrantes(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [entrantesData]);

  return (
    <EntrantesContainer>
      {entrantesData.map(entrante => (
        <EntrantesCard key={entrante.nombre}>
          <EntrantesImage top width="100%" src={entrante.imagen} alt={entrante.nombre} />
          <EntrantesCardBody>
            <div>
              <EntrantesTitle>{entrante.nombre}</EntrantesTitle>
              <EntrantesDescription>{entrante.descripcion}</EntrantesDescription>
              <EntrantesPrice>{entrante.precio} €</EntrantesPrice>
            </div>
            <EntrantesButton>Agregar al carrito</EntrantesButton>
            <Link to={`/productos?nombre=${entrante.nombre}`} style={{ textDecoration: 'none' }}>
  <DetallesButton>Ver detalles</DetallesButton>
</Link>
          </EntrantesCardBody>
        </EntrantesCard>
      ))}
    </EntrantesContainer>
  );
};

export default Entrantes;
