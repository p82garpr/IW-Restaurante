import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import MenuCategorias from './components/MenuCategorias';
import Registro from './components/Registro';
import Home from './components/Home';
import Perfil from './components/Perfil';
import ProductoDetalle from './components/ProductoDetalle';
import CerrarSesion from './components/CerrarSesion';
import IniciarSesion from './components/IniciarSesion';
import Categoria from './components/Categoria';

const App = () => {
  return (
    
    <Router>
      <div>
        <Navbar color="light" light expand="md" />
        <Switch>
          <Route exact path="/" component={MenuCategorias} />
          <Route path="/MenuCategorias" component={MenuCategorias} />
          <Route path="/Entrantes" render={() => <Categoria tipo="entrante" />} />

          <Route path="/Bebidas" render={() => <Categoria tipo="bebida" />} />

          <Route path="/Postres" render={() => <Categoria tipo="postre" />} />

          <Route path="/Principales" render={() => <Categoria tipo="principal" />} />

          <Route path="/Perfil" component={Perfil} />
          <Route path="/Registro" component={Registro} />
          <Route path="/productos/:id" component={ProductoDetalle} />          
          <Route path="/CerrarSesion" component={CerrarSesion} />
          <Route path="/IniciarSesion" component={IniciarSesion} />

        </Switch>
        
      </div>
    </Router>
   
  );
}

export default App;
