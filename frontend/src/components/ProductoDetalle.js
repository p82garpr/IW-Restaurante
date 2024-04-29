import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

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

  console.log(producto);
  if (!producto) {
    return <div>Producto no encontrado.</div>;
  }


  

  const Contenedor = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
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
  `;

  const ProductoInformacion = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
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
  `;

  return (
    <Contenedor>
      <ProductoDetalleContenedor>
        <ProductoImagen>
          <ProductoImagenImg src={producto.imagen} alt={producto.nombre} />
        </ProductoImagen>
        <ProductoInformacion>
          <ProductoNombre>{producto.nombre}</ProductoNombre>
          <ProductoDescripcion>{producto.descripcion}</ProductoDescripcion>
          <Precio>Precio: {producto?.precio && String(producto.precio)} €</Precio>
        </ProductoInformacion>
      </ProductoDetalleContenedor>
    </Contenedor>
  );
};

export default ProductoDetalle;
