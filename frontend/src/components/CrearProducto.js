import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FormularioContainer = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const TituloFormulario = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const CampoFormulario = styled.div`
  margin-bottom: 15px;
  text-align: left;
`;

const Etiqueta = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Boton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-3px);
  }
`;

const CrearProducto = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const obtenerUsuarioActual = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/usuarios/auth/sesion', { withCredentials: true });
        setUsuario(response.data);
      } catch (error) {
        console.error('Error al obtener información del usuario:', error);
      }
    };

    obtenerUsuarioActual();
  }, []);

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const productoData = {
          nombre,
          precio,
          categoria,
          descripcion,
          ingredientes,
          imagen: imagen.name,
        };
    
        // Enviar los datos del producto al servidor
        const responseProducto = await axios.post('http://localhost:4000/api/productos', productoData);
    
        if (responseProducto.status === 200) {
          setMensaje('El producto ha sido creado');
          setNombre('');
          setPrecio('');
          setCategoria('');
          setDescripcion('');
          setIngredientes('');
          setImagen(null);
    
          // Si la solicitud del producto fue exitosa, enviar la imagen al servidor
          try {
            const formData = new FormData();
            formData.append('imagen', imagen);
    
            const responseImagen = await axios.post('http://localhost:4000/api/subir-imagen', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
    
            if (responseImagen.status === 200) {
              setMensaje('La imagen ha sido subida correctamente');
            }
          } catch (error) {
            setMensaje('Error al subir la imagen');
          }
        }
      } catch (error) {
        setMensaje('Error al crear el producto');
      }





  };

  return (
    usuario && usuario.privilegio === 1 ? (
      <FormularioContainer>
        <TituloFormulario>Crear Nuevo Producto</TituloFormulario>
        <form onSubmit={handleSubmit}>
          <CampoFormulario>
            <Etiqueta>Nombre</Etiqueta>
            <Input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </CampoFormulario>
          <CampoFormulario>
            <Etiqueta>Precio</Etiqueta>
            <Input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </CampoFormulario>
          <CampoFormulario>
            <Etiqueta>Categoría</Etiqueta>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            >
              <option value="">Seleccione una categoría</option>
              <option value="entrante">Entrante</option>
              <option value="principal">Principal</option>
              <option value="postre">Postre</option>
              <option value="bebida">Bebida</option>
            </select>
          </CampoFormulario>
          <CampoFormulario>
            <Etiqueta>Descripción</Etiqueta>
            <Input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </CampoFormulario>
          <CampoFormulario>
            <Etiqueta>Ingredientes</Etiqueta>
            <Input
              type="text"
              value={ingredientes}
              onChange={(e) => setIngredientes(e.target.value)}
              required
            />
          </CampoFormulario>
          <CampoFormulario>
            <Etiqueta>Imagen</Etiqueta>
            <Input
              type="file"
              onChange={handleImageChange}
              required
            />
          </CampoFormulario>
          {mensaje && <p>{mensaje}</p>}
          <Boton type="submit">Crear Producto</Boton>
        </form>
      </FormularioContainer>
    ) : (
      <p>No autorizado</p> // Redirección a error 403 si es necesario
    )
  );
};

export default CrearProducto;