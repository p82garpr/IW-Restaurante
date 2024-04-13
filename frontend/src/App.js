import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import MenuCategorias from './components/MenuCategorias';
import Entrantes from './components/Entrantes';
import Bebidas from './components/Bebidas';
import Postres from './components/Postres';
import Principales from './components/Principales';

import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar color="light" light expand="md" />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/components/MenuCategorias" component={MenuCategorias} />
          <Route path="/components/Entrantes" component={Entrantes} />
          <Route path="/components/Bebidas" component={Bebidas} />
          <Route path="/components/Postres" component={Postres} />
          <Route path="/components/Principales" component={Principales} />
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
