import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import MenuCategorias from './components/MenuCategorias';
import Entrantes from './components/Entrantes';
import Bebidas from './components/Bebidas';
import Postres from './components/Postres';
import Principales from './components/Principales';

import Home from './components/Home';
import Perfil from './components/Perfil';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar color="light" light expand="md" />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/MenuCategorias" component={MenuCategorias} />
          <Route path="/Entrantes" component={Entrantes} />
          <Route path="/Bebidas" component={Bebidas} />
          <Route path="/Postres" component={Postres} />
          <Route path="/Principales" component={Principales} />
          <Route path="/Perfil" component={Perfil} />
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
