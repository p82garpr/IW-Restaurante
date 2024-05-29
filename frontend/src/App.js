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
import MenuAdmin from './components/MenuAdmin';
import Comandas from './components/Comandas';
import Mesas from './components/Mesas';
import Pedido from './components/Pedido';
import HistoricoComandas from './components/HistoricoComandas';
import ProductosComandas from './components/ProductosComandas';

import axios from 'axios';
axios.defaults.withCredentials = true;

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
          <Route path="/Pedido" component={Pedido} />
          <Route path="/admin" component={MenuAdmin} />
          <Route path="/Comandas" component={Comandas} />
          <Route path="/Mesas" component={Mesas} />
          <Route path="/HistoricoComandas" component={HistoricoComandas} />
          <Route path="/ProductosComandas" component={ProductosComandas} />
          <Route path="/HistoricoUsuario" component={HistoricoUsuario} />

          <Route path="/CrearMesa" component={CrearMesa} />

        </Switch>
        
      </div>
    </Router>
   
  );
}

export default App;
