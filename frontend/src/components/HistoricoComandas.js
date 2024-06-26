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
  const [nombresUsuarios, setNombresUsuarios] = useState({});
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/comandas', { withCredentials: true });
        const comandasData = response.data;
        setComandas(comandasData);

        // Fetch user names
        const nombres = {};
        await Promise.all(comandasData.map(async (comanda) => {
          try {
            const usuarioResponse = await axios.get(`http://localhost:4000/api/usuarios/${comanda.id_usuario}`, { withCredentials: true });
            nombres[comanda.id_usuario] = usuarioResponse.data.nombre;
          } catch (error) {
            console.error('Error fetching user:', error);
          }
        }));
        setNombresUsuarios(nombres);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
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
              <NombreProducto>Cliente: {nombresUsuarios[comanda.id_usuario]}</NombreProducto>
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
