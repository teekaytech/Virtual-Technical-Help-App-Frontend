import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from './components/Navbar';
import Dashboard from './containers/Dashboard';
import Home from './containers/Home';
import { checkLoginStatus } from './actions/auth';

const App = ({ checkLoginStatus }) => {
  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  return (
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
};

App.defaultProps = {
  checkLoginStatus: PropTypes.func,
};

App.propTypes = {
  checkLoginStatus: PropTypes.func,
};

const mapStateToProps = state => ({
  status: state.auth.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  checkLoginStatus: () => dispatch(checkLoginStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
