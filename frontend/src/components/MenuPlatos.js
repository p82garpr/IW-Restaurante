import React from 'react';
import './MenuPlatos.css'; // Archivo CSS para los estilos

const MenuPlatos = () => {
  const platos = [
    { id: 1, nombre: 'Plato 1', categoria: 'Entrantes', precio: 10, imagen: 'url_de_la_imagen' },
    { id: 2, nombre: 'Plato 2', categoria: 'Platos Principales', precio: 15, imagen: 'url_de_la_imagen' },
    // Agrega más platos según sea necesario
  ];

  const categorias = [...new Set(platos.map((plato) => plato.categoria))]; // Obtener categorías únicas

  return (
    <div className="menu-container">
      <nav className="menu-navigation">
        <button className="menu-button">Iniciar Sesión</button>
        <button className="menu-button">Cesta</button>
      </nav>

      <div className="menu-section">
        {categorias.map((categoria, index) => (
          <div key={index} className="categoria-card">
            <h2 className="categoria-titulo">{categoria}</h2>
            <div className="platos-container">
              {platos.filter((plato) => plato.categoria === categoria).map((plato) => (
                <div key={plato.id} className="plato-card">
                  <img src={plato.imagen} alt={plato.nombre} className="plato-imagen" />
                  <div className="plato-info">
                    <h3 className="plato-nombre">{plato.nombre}</h3>
                    <p className="plato-precio">Precio: ${plato.precio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPlatos;
