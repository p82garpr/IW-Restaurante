import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Encabezado = styled.h1`
  color: #333;
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
`;

const MesasContainer = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const MesaItem = styled.div`
  position: relative;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  background-color: ${({ estado }) => (estado === 'Libre' ? '#7eff7e' : '#ff7e7e')};

  &:hover {
    transform: translateY(-5px);
  }
`;

const DetallesMesa = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const NumeroMesa = styled.h3`
  margin: 0;
  color: #333;
`;

const CapacidadMesa = styled.p`
  margin: 5px 0;
  color: #555;
`;

const EstadoMesa = styled.p`
  margin: 5px 0;
  color: #555;
`;

const QrImage = styled.img`
  margin-top: 10px;
  width: 100px;
  height: 100px;
`;

const BotonOcuparMesa = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
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

const Mesas = () => {
  const [mesas, setMesas] = useState([]);

  useEffect(() => {
    const obtenerMesas = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/mesa', { withCredentials: true });
        setMesas(response.data);
      } catch (error) {
        console.error('Error al obtener las mesas:', error);
      }
    };

    obtenerMesas();
  }, []);

  const alternarDisponibilidadMesa = async (id, estadoActual) => {
    const nuevoEstado = estadoActual === 'Libre' ? 'Ocupada' : 'Libre';
    try {
      await axios.put(`http://localhost:4000/api/mesa/${id}`, {
        estado: nuevoEstado
      });
      // Actualizar las mesas después de alternar la disponibilidad de la mesa
      const response = await axios.get('http://localhost:4000/api/mesa', { withCredentials: true });
      setMesas(response.data);
    } catch (error) {
      console.error('Error al alternar la disponibilidad de la mesa:', error);
    }
  };

  return (
    <>
      <Encabezado>Listado de Mesas</Encabezado>
      <MesasContainer>
        {mesas.length === 0 ? (
          <p>No hay mesas registradas</p>
        ) : (
          mesas.map((mesa) => (
            <MesaItem key={mesa._id} estado={mesa.estado}>
              <DetallesMesa>
                <NumeroMesa>Mesa Nº: {mesa.numero_mesa}</NumeroMesa>
                <CapacidadMesa>Capacidad: {mesa.capacidad}</CapacidadMesa>
                <EstadoMesa>Estado: {mesa.estado}</EstadoMesa>
                <QrImage src={mesa.QR} alt={`QR de la mesa ${mesa.numero_mesa}`} />
              </DetallesMesa>
              <BotonOcuparMesa onClick={() => alternarDisponibilidadMesa(mesa._id, mesa.estado)}>
                {mesa.estado === 'Libre' ? 'Ocupar Mesa' : 'Liberar Mesa'}
              </BotonOcuparMesa>
            </MesaItem>
          ))
        )}
      </MesasContainer>
    </>
  );
};

export default Mesas;
