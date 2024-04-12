import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MenuPlatos from './components/MenuPlatos';

function App() {
  return (
    <Router>
      <Switch>
        {/* Ruta para el componente MenuPlatos */}
        <Route path="/menu-platos">
          <MenuPlatos />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
