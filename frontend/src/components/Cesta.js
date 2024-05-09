import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import styled from 'styled-components';

const SidePanel = styled.div`
  position: fixed;
  top: 0;
  ${({ open }) => (open ? 'right: 0;' : 'right: -300px;')}
  width: 300px;
  height: 100%;
  background-color: #333; /* Fondo más oscuro */
  color: #fff; /* Texto en blanco */
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  transition: right 0.3s ease;
  z-index: 1000;
  overflow-y: auto; /* Barra de desplazamiento vertical */

  @media only screen and (max-width: 768px) {
    ${({ open }) => (open ? 'width: 75%;' : 'width: 0;')}
    ${({ open }) => (open ? 'right: 0;' : 'right: -100%;')}
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 50%;
  ${({ open }) => (open ? 'right: 300px;' : 'right: 0;')}
  transform: translateY(-50%);
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0 5px 5px 0;
  padding: 10px;
  cursor: pointer;
  transition: right 0.3s ease;
  z-index: 1000;

  @media only screen and (max-width: 768px) {
    ${({ open }) => (open ? 'right: 75%;' : 'right: 0;')}
  }
`;

const CestaItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background-color: #444; /* Fondo de la tarjeta más oscuro */
  padding: 10px; /* Espaciado interno */
  border-radius: 10px; /* Bordes redondeados */
`;

const ProductoImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const DetallesProducto = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const NombreProducto = styled.h3`
  margin: 0;
`;

const PrecioProducto = styled.p`
  margin: 5px 0;
`;

const CantidadProducto = styled.p`
  margin: 5px 0;
`;
const TotalContainer = styled.div`
  margin-top: 20px;
`;

const TotalText = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Cesta = () => {
  const [productos, setProductos] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const obtenerUsuarioActual = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/usuarios/auth/sesion', { withCredentials: true });
        setUsuario(response.data);
        if (response.data) {
          const cestaResponse = await axios.get(`http://localhost:4000/api/cesta/`, { withCredentials: true });
          setProductos(cestaResponse.data.cesta);
          calcularTotal(cestaResponse.data.cesta); // Llama a calcularTotal después de actualizar los productos
        }
      } catch (error) {
        console.error('Error al obtener información del usuario:', error);
      }
    }

    obtenerUsuarioActual();
  }, []);

  const removerProducto = async (productoId) => {
    try {
      await axios.delete(`http://localhost:4000/api/cesta/${productoId}`, { withCredentials: true });
      const cestaResponse = await axios.get(`http://localhost:4000/api/cesta/`, { withCredentials: true });
      setProductos(cestaResponse.data.cesta);
      calcularTotal(cestaResponse.data.productos); // Llama a calcularTotal después de actualizar los productos
    } catch (error) {
      console.error('Error al eliminar el producto de la cesta:', error);
    }
  };
  
  const calcularTotal = (productos) => {
    const total = productos.producto.reduce((acc, curr) => acc + curr.precio * curr.cantidad, 0);
    setTotal(total);
  };

  const limpiarCesta = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/usuarios/${usuario.id}/cesta`, { withCredentials: true });
      setProductos([]);
      setTotal(0); // Reinicia el total a 0 al limpiar la cesta
    } catch (error) {
      console.error('Error al limpiar la cesta:', error);
    }
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <ToggleButton open={open} onClick={handleToggle}>
        {open ? 'Cerrar Cesta' : 'Abrir Cesta'}
      </ToggleButton>
      <SidePanel open={open}>
        <h2 style={{ textAlign: 'center', padding: '20px 0', borderBottom: '1px solid #666' }}>Cesta de Compras</h2>
        {productos.length === 0 ? (
          <p>La cesta está vacía</p>
        ) : (
          <div>
            {productos.map((producto) => (
              <CestaItem key={producto._id}>
                <ProductoImage src={`/images/${producto.producto.imagen}`} alt={producto.producto.nombre} />
                <DetallesProducto>
                  <NombreProducto>{producto.producto.nombre}</NombreProducto>
                  <PrecioProducto>Precio: {producto.producto.precio} €</PrecioProducto>
                  <CantidadProducto>Cantidad: {producto.cantidad}</CantidadProducto>
                  <Button color="danger" onClick={() => removerProducto(producto.producto._id)}>Eliminar</Button>
                </DetallesProducto>
              </CestaItem>
            ))}
            <TotalContainer>
              <TotalText>Total: {total} €</TotalText>
            </TotalContainer>
            
          </div>
        )}
      </SidePanel>
    </div>
  );
};

export default Cesta;
