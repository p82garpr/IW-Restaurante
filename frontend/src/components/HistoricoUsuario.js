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

const HistoricoUsuario = () => {
  const [comandas, setComandas] = useState([]);
  const [idusuario, setIdUsuario] = useState('');
  const history = useHistory();

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const usuarioResponse = await axios.get('http://localhost:4000/api/usuarios/auth/sesion', { withCredentials: true });
        console.log('Nombre del usuario:', usuarioResponse.data._id);
        setIdUsuario(usuarioResponse.data._id);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    obtenerUsuario();
  }, []);

  useEffect(() => {
    const obtenerComandas = async () => {
      try {
        if (idusuario) {
          const comandasResponse = await axios.get('http://localhost:4000/api/comandas', { withCredentials: true });
          const comandasFiltradas = comandasResponse.data.filter((comanda) => comanda.id_usuario === idusuario);
          console.log('Comandas:', comandasFiltradas);
          setComandas(comandasFiltradas);
        }
      } catch (error) {
        console.error('Error al obtener las comandas:', error);
      }
    };

    obtenerComandas();
  }, [idusuario]);

  const verProductosComanda = (idComanda) => {
    history.push(`/ProductosComandas?idComanda=${idComanda}`);
  };

  return (
    <ComandasContainer>
      <Encabezado>Historico de Comandas</Encabezado>
      {comandas.length === 0 ? (
        <p>No hay registros de Comandas</p>
      ) : (
        comandas.map((comanda) => (
          <ComandaItem key={comanda._id}>
            <DetallesComanda>
              <NombreProducto>Mesa: {comanda.mesa}</NombreProducto>
              <FechaComanda>Fecha: {new Date(comanda.fecha).toLocaleDateString()}</FechaComanda>
              <PrecioProducto>Total: {parseFloat(comanda.precio_total).toFixed(2)} €</PrecioProducto>
              <BotonesContainer>
                <Boton onClick={() => verProductosComanda(comanda._id)}>Productos Comanda</Boton>
              </BotonesContainer>
            </DetallesComanda>
          </ComandaItem>
        ))
      )}
    </ComandasContainer>
  );
};

export default HistoricoUsuario;
