import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductoDetalle = ({ match }) => {
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/productos/${match.params.nombre}`);
        setProducto(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProducto();
  }, [match.params.nombre]);


  return (
    <div className="container">
      <h2 className="mt-5 mb-4">{producto.nombre}</h2>
      <div className="row">
        <div className="col-md-6">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>
        <div className="col-md-6">
          <h3>Descripción:</h3>
          <p>{producto.descripcion}</p>
          <h3>Precio:</h3>
          <p>{producto.precio} €</p>
          {/* Otros detalles del producto */}
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
