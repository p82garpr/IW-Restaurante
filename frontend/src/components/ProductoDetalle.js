import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

const ProductoDetalle = () => {
  const [producto, setProducto] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/productos/${id}`);
        setProducto(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        // You can redirect to an error page or show a message here
      }
    };
    fetchProducto();
  }, [id]);

  if (!producto) {
    return <div>Producto no encontrado.</div>;
  }

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

  const Contenedor = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    animation: ${slideUp} 1.5s ease-in-out;
  `;

  const ProductoDetalleContenedor = styled.div`
    display: flex;
    gap: 30px;
  `;

  const ProductoImagen = styled.div`
    width: 300px;
    height: 300px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  `;

  const ProductoImagenImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  `;

  const ProductoInformacion = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    animation: ${slideUp} 0.5s ease-in-out 0.2s; /* Delayed animation */
  `;

  const ProductoNombre = styled.h2`
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 10px;
  `;

  const ProductoDescripcion = styled.p`
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 10px;
  `;

  const Precio = styled.p`
    font-size: 1.4rem;
    font-weight: bold;
    color: green;
    margin-bottom: 10px;
  `;

  const IngredientesList = styled.ul`
    list-style-type: circle;
    padding: 0;
    margin: 0;
    font-size: 1.2rem;
  `;

  const IngredienteItem = styled.li`
    margin-bottom: 5px;
  `;

  return (
    <Contenedor>
      <ProductoDetalleContenedor>
        <ProductoImagen>
          <ProductoImagenImg src={`/images/${producto.imagen}`} alt={producto.nombre} />
        </ProductoImagen>
        <ProductoInformacion>
          <ProductoNombre>{producto.nombre}</ProductoNombre>
          <ProductoDescripcion>{producto.descripcion}</ProductoDescripcion>
          <Precio>Precio: {producto?.precio && String(producto.precio)} €</Precio>
          <IngredientesList>
            <b>Ingredientes:</b>
            {producto.ingredientes.map((ingrediente, index) => (
              <IngredienteItem key={index}>{ingrediente}</IngredienteItem>
            ))}
          </IngredientesList>
        </ProductoInformacion>
      </ProductoDetalleContenedor>
    </Contenedor>
  );
};

export default ProductoDetalle;
