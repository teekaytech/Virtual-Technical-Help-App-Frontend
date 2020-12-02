import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './containers/Dashboard';
import Home from './containers/Home';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/user/:user_id/dashboard" component={Dashboard} />
        </Switch>
      </main>
    </div>
  </BrowserRouter>
);

export default App;
