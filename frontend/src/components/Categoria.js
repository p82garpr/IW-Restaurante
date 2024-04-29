import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import styled from 'styled-components';
import axios from 'axios';

const ProductosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

const ProductoCard = styled(Card)`
  width: 300px;
  margin: 20px;
`;

const ProductoImage = styled(CardImg)`
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const ProductoTitle = styled(CardTitle)`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const ProductoDescription = styled(CardText)`
  font-size: 1.2rem;
`;

const ProductoPrice = styled(CardText)`
  color: green;
  font-size: 1.2rem;
  text-align: center;
  font-weight: bold;
  margin-top: auto; /* Alinea el precio en la parte inferior de la tarjeta */
`;

const ProductoButton = styled(Button)`
  background-color: #1a237e;
  border-color: #1a237e;
  font-size: 1.2rem;

  &:hover {
    background-color: #3f51b5;
    border-color: #3f51b5;
  }
`;

const ProductoCardBody = styled(CardBody)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const DetallesButton = styled(Button)`
  background-color: #6200ea;
  border-color: #6200ea;
  font-size: 1rem;
  width: 100%;
  margin: 5px 0;

  &:hover {
    background-color: #9c4dcc;
    border-color: #9c4dcc;
  }
`;

const Producto = ({ tipo }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/productos/categoria/${tipo}`);
        setProductos(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [tipo]);

  return (
    <ProductosContainer>
      {productos.map(producto => (
        <ProductoCard key={producto._id}> {/* Use _id as the key */}
          <ProductoImage top width="100%" src={producto.imagen} alt={producto.nombre} />
          <ProductoCardBody>
            <ProductoTitle>{producto.nombre}</ProductoTitle>
            <ProductoDescription>{producto.descripcion}</ProductoDescription>
            <ProductoPrice>{producto.precio} €</ProductoPrice>
            <ProductoButton>Agregar al carrito</ProductoButton>
            <Link to={`/productos/${producto._id}`} style={{ textDecoration: 'none' }}>  {/* Pass _id in the link */}
              <DetallesButton>Ver detalles</DetallesButton>
            </Link>
          </ProductoCardBody>
        </ProductoCard>
      ))}
    </ProductosContainer>
  );
};

export default Producto;
