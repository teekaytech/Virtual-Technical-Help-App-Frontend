import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from './components/Navbar';
import Dashboard from './containers/Dashboard';
import Home from './containers/Home';
import { checkLoginStatus } from './actions/auth';
import { LOGGED_IN } from './actions/types';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

const App = ({ checkLoginStatus, status, loading }) => {
  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  if (loading) {
    return (
      <p>Loading...</p>
    );
  }

  if (status === LOGGED_IN) {
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
  }

  return (
    <div>
      <Login />
      <Signup />
    </div>
  );
};

App.defaultProps = {
  checkLoginStatus: PropTypes.fuloadingnc,
};

App.propTypes = {
  checkLoginStatus: PropTypes.func,
  status: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  status: state.auth.loggedIn,
  loading: state.auth.loading,
});

const mapDispatchToProps = dispatch => ({
  checkLoginStatus: () => dispatch(checkLoginStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
