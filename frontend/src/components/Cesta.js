import React, { createContext, useContext, useState } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';

// Creamos el contexto de la cesta
const CestaContext = createContext();

// Proveedor de la cesta
export const CestaProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  // Agregar un producto a la cesta
  const agregarProducto = (producto) => {
    setProductos([...productos, producto]);
  };

  // Remover un producto de la cesta
  const removerProducto = (index) => {
    const nuevaCesta = [...productos];
    nuevaCesta.splice(index, 1);
    setProductos(nuevaCesta);
  };

  // Limpiar la cesta
  const limpiarCesta = () => {
    setProductos([]);
  };

  return (
    <CestaContext.Provider value={{ productos, agregarProducto, removerProducto, limpiarCesta }}>
      {children}
    </CestaContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de la cesta
export const useCesta = () => {
  return useContext(CestaContext);
};

const Cesta = () => {
  const { productos, removerProducto, limpiarCesta } = useCesta();

  return (
    <div>
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
    </div>
  );
};

export default Cesta;
