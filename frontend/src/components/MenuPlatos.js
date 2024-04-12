import React from 'react';
import './MenuPlatos.css'; // Archivo CSS para los estilos

const MenuPlatos = () => {
  const platos = [
    { id: 1, nombre: 'Plato 1', categoria: 'Entrantes', precio: 10, imagen: 'url_de_la_imagen' },
    { id: 2, nombre: 'Plato 2', categoria: 'Platos Principales', precio: 15, imagen: 'url_de_la_imagen' },
    // Agrega más platos según sea necesario
  ];

  return (
    <div className="menu-container">
      <nav className="menu-navigation">
        <ul>
          <li>Iniciar Sesión</li>
          <li>Cesta</li>
        </ul>
      </nav>

      <div className="menu-section">
        {platos.map((plato, index) => (
          <div key={index} className="categoria-container">
            <h2>{plato.categoria}</h2>
            <div className="platos-container">
              {platos.map((platoItem) => (
                <div key={platoItem.id} className="plato-card">
                  <img src={platoItem.imagen} alt={platoItem.nombre} />
                  <div className="plato-info">
                    <h3>{platoItem.nombre}</h3>
                    <p>Precio: ${platoItem.precio}</p>
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
