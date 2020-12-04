import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from './components/Navbar';
import Home from './containers/Home';
import { checkLoginStatus, logout } from './actions/auth';
import { LOGGED_IN } from './actions/types';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AppointmentList from './containers/AppointmentList';
import EngineerList from './containers/EngineerList';
import Engineer from './components/Engineer';

const App = ({
  checkLoginStatus, status, loading, logoutUser,
}) => {
  useEffect(() => {
    checkLoginStatus();
    setTimeout(() => {
      logoutUser();
    }, 1200000); // logout the user after 30minutes of inactivity
  }, [checkLoginStatus, logoutUser]);

  if (loading) {
    return <p>Loading...</p>;
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
              <Route
                exact
                path="/user/:user_id/appointments"
                component={AppointmentList}
              />
              <Route exact path="/engineers" component={EngineerList} />
              <Route exact path="/engineers/:id" component={Engineer} />
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

App.propTypes = {
  checkLoginStatus: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  status: state.auth.loggedIn,
  loading: state.auth.loading,
});

const mapDispatchToProps = dispatch => ({
  checkLoginStatus: () => dispatch(checkLoginStatus()),
  logoutUser: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
