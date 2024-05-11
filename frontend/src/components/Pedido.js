import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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

const DetallesProducto = styled.div`
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

const PedidoCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
`;

const TotalText = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

const BotonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Boton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Encabezado = styled.h1`
  color: #333;
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
`;

const Subtitulo = styled.h2`
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const InputCodigo = styled.input`
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const BotonComprobar = styled(Boton)`
  flex: 0 0 25%;
`;

const Pedido = () => {
  const [productosCesta, setProductosCesta] = useState([]);
  const [total, setTotal] = useState(0);
  const [codigoDescuento, setCodigoDescuento] = useState('');
  const history = useHistory();

  useEffect(() => {
    const obtenerProductosCesta = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/cesta', { withCredentials: true });
        setProductosCesta(response.data.cesta);
        calcularTotal(response.data.cesta);
      } catch (error) {
        console.error('Error al obtener los productos de la cesta:', error);
      }
    };

    obtenerProductosCesta();
  }, []);

  const calcularTotal = (productos) => {
    const totalCalculado = productos.reduce((acc, producto) => acc + producto.producto.precio * producto.cantidad, 0);
    setTotal(totalCalculado.toFixed(2));
  };

  const finalizarPedido = () => {
    // Aquí puedes implementar la lógica para finalizar el pedido
    console.log('Pedido finalizado');
  };

  const volverACategoria = () => {
    history.push('/');
  };

  const handleCodigoChange = (event) => {
    setCodigoDescuento(event.target.value);
  };

  const handleComprobarCodigo = () => {
    // Lógica para comprobar el código de descuento
    console.log('Código de descuento:', codigoDescuento);
  };

  return (
    <PedidoContainer>
      <Encabezado>Pedido</Encabezado>
      <div>
        {productosCesta.map((producto) => (
          <ProductoItem key={producto._id}>
            <ProductoImage src={`/images/${producto.producto.imagen}`} alt={producto.producto.nombre} />
            <DetallesProducto>
              <NombreProducto>{producto.producto.nombre}</NombreProducto>
              <PrecioProducto>Precio: {producto.producto.precio} €</PrecioProducto>
              <CantidadProducto>Cantidad: {producto.cantidad}</CantidadProducto>
            </DetallesProducto>
          </ProductoItem>
        ))}
      </div>
      <PedidoCard>
        <Subtitulo>Cuenta</Subtitulo>
        <TotalText>Total: {total} €</TotalText>
        <InputContainer>
          <InputCodigo type="text" placeholder="Introduce código de descuento" value={codigoDescuento} onChange={handleCodigoChange} />
          <BotonComprobar onClick={handleComprobarCodigo}>Comprobar</BotonComprobar>
        </InputContainer>
        <TotalText>Descuento: 0 €</TotalText>
        <TotalText>Precio Final: {total} €</TotalText>
        
        <BotonContainer>
          <Boton onClick={finalizarPedido}>Finalizar Pedido</Boton>
          <Boton onClick={volverACategoria}>Seguir Comprando</Boton>
        </BotonContainer>
      </PedidoCard>
    </PedidoContainer>
  );
};

export default Pedido;
