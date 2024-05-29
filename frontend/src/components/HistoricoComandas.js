import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ComandasContainer = styled.div`
  padding: 20px;
`;

const ComandaItem = styled.div`
  position: relative;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const DetallesComanda = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const NombreProducto = styled.h3`
  margin: 0;
  color: #333;
`;

const FechaComanda = styled.p`
  margin: 5px 0;
  color: #555;
`;

const ComentariosComanda = styled.p`
  margin: 5px 0;
  color: #555;
`;

const PrecioProducto = styled.p`
  margin: 5px 0;
  color: #555;
`;

const BotonesContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
`;

const Boton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
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

const HistoricoComandas = () => {
  const [comandas, setComandas] = useState([]);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const history = useHistory();

  useEffect(() => {
    const obtenerComandas = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/comandas', { withCredentials: true });
        const comandasPorServir = response.data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        setComandas(comandasPorServir);
      } catch (error) {
        console.error('Error al obtener las comandas:', error);
      }
    };
    const obtenerUsuario = async () => {
      try {
        //buscar el nombre del usuario con id de sesion en la comanda
        const response = await axios.get('http://localhost:4000/api/comandas', { withCredentials: true });
        const idUsuario = response.data[0].id_usuario;
        //console.log('ID del usuario:', idUsuario);
        const responseUsuario = await axios.get(`http://localhost:4000/api/usuarios/${idUsuario}`, { withCredentials: true });
        //console.log('Nombre del usuario:', responseUsuario.data.nombre);
        setNombreUsuario(responseUsuario.data.nombre);
      }
      catch (error) {
        console.error('Error al obtener el nombre del usuario:', error);
      }
    };
    
    obtenerUsuario();

    obtenerComandas();
  }, []);
  const verProductosComanda = (idComanda) => {
    history.push(`/ProductosComandas?idComanda=${idComanda}`);
  };
  return (
    <ComandasContainer>
      <Encabezado>Historico de Comandas</Encabezado>
      {comandas.length === 0 ? (
        <p>No hay registro de Comandas</p>
      ) : (
        comandas.map((comanda) => (
          <ComandaItem key={comanda._id}>
            <DetallesComanda>
              <NombreProducto>Mesa: {comanda.mesa}</NombreProducto>
              <NombreProducto>Cliente: {nombreUsuario}</NombreProducto>
              <FechaComanda>Fecha: {new Date(comanda.fecha).toLocaleDateString()}</FechaComanda>
              <ComentariosComanda>Comentarios: {comanda.comentarios}</ComentariosComanda>
              <PrecioProducto>Total: {comanda.precio_total} €</PrecioProducto>
            </DetallesComanda>
            <BotonesContainer>
              <Boton onClick={() => verProductosComanda(comanda._id)}>Productos Comanda</Boton>
            </BotonesContainer>
          </ComandaItem>
        ))
      )}
    </ComandasContainer>
  );
};

export default HistoricoComandas;
