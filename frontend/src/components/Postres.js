import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import styled from 'styled-components';
import axios from 'axios';

const PostresContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

const PostresCard = styled(Card)`
  width: 300px;
  margin: 20px;
`;

const PostresImage = styled(CardImg)`
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const PostresTitle = styled(CardTitle)`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const PostresDescription = styled(CardText)`
  font-size: 1.2rem;
`;

const PostresPrice = styled(CardText)`
  color: green;
  font-size: 1.2rem;
  text-align: center;
  font-weight: bold;
  margin-top: auto; /* Alinea el precio en la parte inferior de la tarjeta */
`;

const PostresButton = styled(Button)`
  background-color: #1a237e;
  border-color: #1a237e;
  font-size: 1.2rem;
  
  &:hover {
    background-color: #3f51b5;
    border-color: #3f51b5;
  }
`;

const PostresCardBody = styled(CardBody)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const PostresContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Para que el contenido pueda expandirse */
`;

const Postres = () => {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const getProductos = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/productos');
        setLista(res.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };
    getProductos();
  }, []);

  const postres = lista.filter(producto => producto.categoria === 'postre');

  return (
    <PostresContainer>
      {postres.map(postre => (
        <PostresCard key={postre.nombre}>
          <PostresImage top width="100%" src={postre.imagen} alt={postre.nombre} />
          <PostresCardBody>
            <PostresContent>
              <PostresTitle>{postre.nombre}</PostresTitle>
              <PostresDescription>{postre.descripcion}</PostresDescription>
            </PostresContent>
            <PostresPrice>{postre.precio} €</PostresPrice>
            <PostresButton>Agregar al carrito</PostresButton>
          </PostresCardBody>
        </PostresCard>
      ))}
    </PostresContainer>
  );
};

export default Postres;
