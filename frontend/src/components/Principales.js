import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import styled from 'styled-components';
//import principalesData from '../data/principalesData.json';
import axios from 'axios';

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
  const [lista, setLista] = useState([]);
  useEffect(() => {
    const getProductos = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/productos/principal');
        setLista(res.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };
    getProductos();
  }, [lista]);
  
  const principales = lista
  return (
    <PrincipalesContainer>
      {principales.map(plato => (
        <PrincipalesCard key={plato.nombre}>
          <PrincipalesImage top width="100%" src={plato.imagen} alt={plato.nombre} />
          <PrincipalesCardBody>
            <PrincipalesContent>
              <PrincipalesTitle>{plato.nombre}</PrincipalesTitle>
              <PrincipalesDescription>{plato.descripcion}</PrincipalesDescription>
            </PrincipalesContent>
            <PrincipalesPrice>{plato.precio} €</PrincipalesPrice>
            <PrincipalesButton>Agregar al carrito</PrincipalesButton>
          </PrincipalesCardBody>
        </PrincipalesCard>
      ))}
    </PrincipalesContainer>
  );
};

export default Principales;
