import React, { useEffect, useState } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import styled from 'styled-components';
import entrantesDataa from '../data/entrantesData.json';
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

const Entrantes = () => {

  //conseguir los entrantes de la api que está en /api/productos y mostrarlos

  const [entrantesData, setEntrantes] = useState([]);
  useEffect(() => {
      const getProductosEntrantes = async () => {
        const response = await axios.get('http://localhost:4000/api/productos');
        setEntrantes(response.data);
  }
  getProductosEntrantes();
  }, [entrantesData]);

  //quedarnos con solo los productos que tengan como categoria "entrantes"
  //const entrantesData = entrantes.filter(entrante => entrante.categoria === "entrante");
  const entrantesFiltrados = entrantesData.filter(entrante => entrante.categoria === "entrante");


  return (
    <EntrantesContainer>
      {entrantesFiltrados.map(entrante => (
        <EntrantesCard key={entrante.nombre}>
          <EntrantesImage top width="100%" src={entrante.imagen} alt={entrante.nombre} />
          <EntrantesCardBody>
            <div>
              <EntrantesTitle>{entrante.nombre}</EntrantesTitle>
              <EntrantesDescription>{entrante.descripcion}</EntrantesDescription>
              <EntrantesPrice>{entrante.precio} €</EntrantesPrice>
            </div>
            <EntrantesButton>Agregar al carrito</EntrantesButton>
          </EntrantesCardBody>
        </EntrantesCard>
      ))}
    </EntrantesContainer>
  );
};

export default Entrantes;
