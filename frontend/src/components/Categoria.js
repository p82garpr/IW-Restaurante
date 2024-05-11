// Producto.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ProductosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  animation: ${slideUp} 1.5s ease-in-out;
`;

const ProductoCard = styled(Card)`
  width: 300px;
  margin: 20px;
  animation: ${slideUp} 0.5s ease-in-out;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
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
  transition: background-color 0.3s ease-in-out;
  width: 100%; /* Ajusta el ancho del botón al 100% */

  &:hover {
    background-color: #3f51b5;
    border-color: #3f51b5;
  }
`;

const ProductoCardBody = styled(CardBody)`
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centra verticalmente los elementos hijos */
  height: 100%;
`;

const DetallesButton = styled(Button)`
  background-color: #6200ea;
  border-color: #6200ea;
  font-size: 1rem;
  width: 100%;
  margin: 5px 0;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #9c4dcc;
    border-color: #9c4dcc;
  }
`;

const Producto = ({ tipo, actualizarCesta, abrirPanel }) => {
  const [productos, setProductos] = useState([]);
  const [usuario, setUsuario] = useState(null);

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

    const obtenerUsuarioActual = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/usuarios/auth/sesion', { withCredentials: true });
        setUsuario(response.data);
      } catch (error) {
        console.error('Error al obtener información del usuario:', error);
      }
    };

    obtenerUsuarioActual();
  }, [tipo]);

  const agregarProductoACesta = async (productoId) => {
    try {
      await axios.post('http://localhost:4000/api/cesta', { productoId, cantidad: 1 });
      actualizarCesta(); // Actualiza la cesta después de agregar un producto
      abrirPanel(); // Abre el SidePanel después de agregar un producto
    } catch (error) {
      console.error('Error al agregar el producto a la cesta:', error);
    }
  };

  return (
    <ProductosContainer>
      {productos.map((producto) => (
        <ProductoCard key={producto._id}>
          <ProductoImage top width="100%" src={`/images/${producto.imagen}`} alt={producto.nombre} />
          <ProductoCardBody>
            <ProductoTitle>{producto.nombre}</ProductoTitle>
            <ProductoPrice>{producto.precio} €</ProductoPrice>
            {usuario ? (
              <ProductoButton onClick={() => agregarProductoACesta(producto._id)}>Agregar al carrito</ProductoButton>
            ) : (
              <Link to="/IniciarSesion" style={{ textDecoration: 'none' }}>
                <ProductoButton>Iniciar sesión para comprar</ProductoButton>
              </Link>
            )}
            <Link to={`/productos/${producto._id}`} style={{ textDecoration: 'none' }}>
              <DetallesButton>Ver detalles</DetallesButton>
            </Link>
          </ProductoCardBody>
        </ProductoCard>
      ))}
    </ProductosContainer>
  );
};

export default Producto;
