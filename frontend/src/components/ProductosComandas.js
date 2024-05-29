import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';

const PedidoContainer = styled.div`
  padding: 20px;
`;

const ProductoItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;

const ProductoImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
`;

const DetallesProductoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const NombreProducto = styled.h3`
  margin: 0;
  color: #333;
`;

const PrecioProducto = styled.p`
  margin: 5px 0;
  color: #555;
`;

const CantidadProducto = styled.p`
  margin: 5px 0;
  color: #555;
`;

const BotonContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* Alineación a la izquierda */
  margin-top: 20px;
`;

const Boton = styled.button`
  padding: 10px 20px;
  background-color: #dc3545; /* Color rojo */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333; /* Color rojo más oscuro al pasar el ratón */
  }
`;

const Encabezado = styled.h1`
  color: #333;
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
`;

// Componente de indicador de carga
const LoadingSpinner = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <p>Cargando...</p>
    </div>
  );
};

const ProductosComandas = () => {
  const [detallesProductos, setDetallesProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productosComanda, setProductosComanda] = useState([]);
  const [userPrivilegios, setUserPrivilegios] = useState(null); // Estado para almacenar los privilegios del usuario
  const history = useHistory();
  const location = useLocation();
  const idComanda = new URLSearchParams(location.search).get('idComanda');

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/usuarios/auth/sesion', { withCredentials: true });
        //console.log('Datos del usuario:', response.data.privilegio);
        setUserPrivilegios(response.data.privilegio);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    const obtenerProductosCesta = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/comandas/${idComanda}`, { withCredentials: true });
        setProductosComanda(response.data.comanda.productos);
      } catch (error) {
        console.error('Error al obtener los productos de la comanda:', error);
      }
    };

    obtenerUsuario();
    if (idComanda) {
      obtenerProductosCesta();
    }
  }, [idComanda]);

  useEffect(() => {
    const obtenerDetallesProductos = async () => {
      try {
        const detalles = [];
        if (productosComanda.length > 0) {
          for (let i = 0; i < productosComanda.length; i++) {
            const response = await axios.get(`http://localhost:4000/api/productos/${productosComanda[i].producto}`, { withCredentials: true });
            detalles.push(response.data);
          }
        }
        setDetallesProductos(detalles);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
      }
    };

    obtenerDetallesProductos();
  }, [productosComanda]);

  const atras = () => {
    if (userPrivilegios === 0) {
      history.push('/HistoricoUsuario');
    } else {
      history.push('/Comandas');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <PedidoContainer>
      <Encabezado>Productos de la Comanda</Encabezado>
      <div>
        {detallesProductos.map((producto, index) => (
          <ProductoItem key={index}>
            <ProductoImage src={`/images/${producto.imagen}`} alt={producto.nombre} />
            <DetallesProductoContainer>
              <NombreProducto>{producto.nombre}</NombreProducto>
              <PrecioProducto>Precio: {producto.precio} €</PrecioProducto>
              <CantidadProducto>Cantidad: {productosComanda[index].cantidad}</CantidadProducto>
            </DetallesProductoContainer>
          </ProductoItem>
        ))}
      </div>
      {/* El botón "Atrás" se encuentra fuera del contenedor de tarjeta */}
      <BotonContainer>
        <Boton onClick={atras}>Atrás</Boton>
      </BotonContainer>
    </PedidoContainer>
  );
};

export default ProductosComandas;
