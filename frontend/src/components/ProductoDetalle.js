import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductoDetalle = (props) => {
  const { id } = useParams(); // Obtener el ID del producto de la URL
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/productos/${props.id}`);
        setProducto(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchProducto();
  }, [id]);

  if (!producto) {
    return <div>Cargando...</div>;
  }

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
