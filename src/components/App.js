import React from 'react';
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import Productions from '../pages/Productions'
import ProductionNew from '../pages/ProductionNew'
import ProductionEdit from '../pages/ProductionEdit';
import Example from '../pages/Example'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/productions" component={Productions} />
        <Route exact path="/productions/new" component={ProductionNew} />
        <Route exaxt path="/productions/:productionId/edit" component={ProductionEdit} />
        <Route exact path="/example" component={Example} />
        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
