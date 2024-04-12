import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import MenuCategorias from './components/MenuCategorias';
import Entrantes from './components/Entrantes';


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
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
