import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ComandasContainer = styled.div`
  padding: 20px;
  position: relative;
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

const Encabezado = styled.h1`
  color: #333;
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
`;

const Subtitulo = styled.h2`
  color: #555;
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
`;

const BotonMostrarHistorico = styled(Boton)`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 20px;
`;

const Comandas = () => {
  const [comandas, setComandas] = useState([]);
  const history = useHistory();
  const [nombreUsuario, setNombreUsuario] = useState('');
  

  useEffect(() => {
    const obtenerComandas = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/comandas', { withCredentials: true });
        const comandasPorServir = response.data.filter(comanda => comanda.estado === 'porServir');
        setComandas(comandasPorServir);
      } catch (error) {
        console.error('Error al obtener las comandas:', error);
      }
    };

    const obtenerUsuario = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/comandas', { withCredentials: true });
        const idUsuario = response.data[0].id_usuario;
        const responseUsuario = await axios.get(`http://localhost:4000/api/usuarios/${idUsuario}`, { withCredentials: true });
        setNombreUsuario(responseUsuario.data.nombre);
      } catch (error) {
        console.error('Error al obtener el nombre del usuario:', error);
      }
    };

    obtenerUsuario();
    obtenerComandas();
  }, []);

  const servirComanda = async (id) => {
    try {
      await axios.put(`http://localhost:4000/api/comandas/${id}`, {
        estado: 'servida'
      });
      const response = await axios.get('http://localhost:4000/api/comandas', { withCredentials: true });
      const comandasPorServir = response.data.filter(comanda => comanda.estado === 'porServir');
      setComandas(comandasPorServir);
    } catch (error) {
      console.error('Error al servir la comanda:', error);
    }
  };

  const verProductosComanda = (idComanda) => {
    history.push(`/ProductosComandas?idComanda=${idComanda}`);
  };

  const mostrarHistorico = () => {
    history.push('/HistoricoComandas');
  };

  return (
    <ComandasContainer>
      <Encabezado>Comandas por Servir</Encabezado>
      {comandas.length === 0 ? (
        <p>No hay comandas por servir</p>
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
              <Boton onClick={() => servirComanda(comanda._id)}>Servir</Boton>
              <Boton onClick={() => verProductosComanda(comanda._id)}>Productos Comanda</Boton>
            </BotonesContainer>
          </ComandaItem>
        ))
      )}
      <BotonMostrarHistorico onClick={mostrarHistorico}>Mostrar Histórico de Comandas</BotonMostrarHistorico>
    </ComandasContainer>
  );
};

export default Comandas;
