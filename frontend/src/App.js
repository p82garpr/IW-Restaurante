import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';


import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar color="light" light expand="md" />
        <Switch>
          <Route exact path="/" component={Home} />
          {/* Aquí puedes agregar más rutas según sea necesario */}

        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
