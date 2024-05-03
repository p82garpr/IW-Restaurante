import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import axios from 'axios';
import styled from 'styled-components';

const SidePanel = styled.div`
  position: fixed;
  top: 0;
  right: ${({ open }) => (open ? '0' : '-300px')};
  width: 300px;
  height: 100%;
  background-color: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  transition: right 0.3s ease;
  z-index: 1000;
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 50%;
  right: ${({ open }) => (open ? '300px' : '0')};
  transform: translateY(-50%);
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0 5px 5px 0;
  padding: 10px;
  cursor: pointer;
  transition: right 0.3s ease;
  z-index: 1000;
`;

const Cesta = () => {
  const [productos, setProductos] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const obtenerUsuarioActual = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/usuarios/auth/sesion', { withCredentials: true });
        setUsuario(response.data);
        if (response.data) {
          const cestaResponse = await axios.get(`http://localhost:4000/api/usuarios/${response.data.id}/cesta`, { withCredentials: true });
          setProductos(cestaResponse.data.productos);
        }
      } catch (error) {
        console.error('Error al obtener información del usuario:', error);
      }
    };

    obtenerUsuarioActual();
  }, []);

  const agregarProducto = (producto) => {
    setProductos([...productos, producto]);
    if (usuario) {
      axios.post(`http://localhost:4000/api/usuarios/${usuario.id}/cesta`, { productos: [...productos, producto] }, { withCredentials: true })
        .catch(error => console.error('Error al guardar la cesta:', error));
    }
  };

  const removerProducto = (index) => {
    const nuevaCesta = [...productos];
    nuevaCesta.splice(index, 1);
    setProductos(nuevaCesta);
    if (usuario) {
      axios.put(`http://localhost:4000/api/usuarios/${usuario.id}/cesta`, { productos: nuevaCesta }, { withCredentials: true })
        .catch(error => console.error('Error al actualizar la cesta:', error));
    }
  };

  const limpiarCesta = () => {
    setProductos([]);
    if (usuario) {
      axios.delete(`http://localhost:4000/api/usuarios/${usuario.id}/cesta`, { withCredentials: true })
        .catch(error => console.error('Error al limpiar la cesta:', error));
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
        <h2>Cesta de Compras</h2>
        {productos.length === 0 ? (
          <p>La cesta está vacía</p>
        ) : (
          <ListGroup>
            {productos.map((producto, index) => (
              <ListGroupItem key={index}>
                {producto.nombre} - {producto.precio} €
                <Button color="danger" onClick={() => removerProducto(index)}>Eliminar</Button>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
        <Button color="primary" onClick={limpiarCesta}>Limpiar Cesta</Button>
      </SidePanel>
    </div>
  );
};

export default Cesta;
