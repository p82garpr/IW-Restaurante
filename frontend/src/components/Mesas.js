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

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
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
  align-items: center;
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
  width: 170px;
  height: 170px;
`;

const BotonesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;

    button {
      margin-bottom: 10px;
      width: 80%;
    }
  }
`;

const BotonOcuparMesa = styled.button`
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

const BotonEliminarMesa = styled.button`
  padding: 10px 15px;
  background-color: #ff0000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b30000;
  }
`;

const BotonDescargarQR = styled.a`
  padding: 10px 15px;
  background-color: #28a745;
  color: #fff;
  text-align: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 10px;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background-color: #218838;
  }
`;

const Mesas = () => {
  const [mesas, setMesas] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const obtenerMesas = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/mesa', { withCredentials: true });
        setMesas(response.data);
      } catch (error) {
        console.error('Error al obtener las mesas:', error);
      }
    };
    const obtenerUsuarioActual = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/usuarios/auth/sesion', { withCredentials: true });
        setUsuario(response.data);
      } catch (error) {
        console.error('Error al obtener información del usuario:', error);
      }
    };

    obtenerMesas();
    obtenerUsuarioActual();
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

  const eliminarMesa = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/mesa/${id}`);
      // Actualizar las mesas después de eliminar la mesa
      const response = await axios.get('http://localhost:4000/api/mesa', { withCredentials: true });
      setMesas(response.data);
    } catch (error) {
      console.error('Error al eliminar la mesa:', error);
    }
  };

  return (
    usuario && usuario.privilegio === 1 ? (
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
                  <BotonDescargarQR href={mesa.QR} download={`QR_Mesa_${mesa.numero_mesa}.png`}>Descargar QR</BotonDescargarQR>
                </DetallesMesa>
                <BotonesContainer>
                  <BotonOcuparMesa onClick={() => alternarDisponibilidadMesa(mesa._id, mesa.estado)}>
                    {mesa.estado === 'Libre' ? 'Ocupar Mesa' : 'Liberar Mesa'}
                  </BotonOcuparMesa>
                  <BotonEliminarMesa onClick={() => eliminarMesa(mesa._id)}>Eliminar Mesa</BotonEliminarMesa>
                </BotonesContainer>
              </MesaItem>
            ))
          )}
        </MesasContainer>
      </>
    ) : (
      <p>No autorizado</p> // HAY QUE METER AQUI UNA REDIRECCION A ERROR 403
    )
  );
};

export default Mesas;
