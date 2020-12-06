import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from './components/Navbar';
import Home from './containers/Home';
import { checkLoginStatus, logout, toggleForm } from './actions/auth';
import { LOGGED_IN } from './actions/types';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AppointmentList from './containers/AppointmentList';
import EngineerList from './containers/EngineerList';
import Engineer from './components/Engineer';

const App = ({
  checkLoginStatus,
  status,
  loading,
  logoutUser,
  toggleForm,
  formFlag,
}) => {
  useEffect(() => {
    checkLoginStatus();
    setTimeout(() => {
      logoutUser();
    }, 1200000); // logout the user after 30minutes of inactivity
  }, [checkLoginStatus, logoutUser]);

  const loadingScreen = () => <p>Loading data...</p>;

  const loggedInScreen = () => (
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
  );

  const authForms = () => {
    if (formFlag) {
      return (
        <article>
          <Login />
          <p>
            New User? Sign up
            {' '}
            <button type="button" onClick={() => toggleForm()}>
              here
            </button>
          </p>
        </article>
      );
    }
    return (
      <article>
        <Signup />
        <p>
          Existing User? Log in
          {' '}
          <button
            type="button"
            onClick={() => toggleForm()}
            className="btn btn-primary"
          >
            here
          </button>
        </p>
      </article>
    );
  };

  return (
    <BrowserRouter>
      <div className="">
        <header>
          <Navbar toggleForm={toggleForm} />
        </header>
      </div>
      <main>
        {status === LOGGED_IN ? loggedInScreen() : authForms()}
        {loading ? loadingScreen() : ''}
      </main>
    </BrowserRouter>
  );
};

App.propTypes = {
  checkLoginStatus: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
  formFlag: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  status: state.auth.loggedIn,
  loading: state.auth.loading,
  formFlag: state.auth.toggleForm,
});

const mapDispatchToProps = dispatch => ({
  checkLoginStatus: () => dispatch(checkLoginStatus()),
  logoutUser: () => dispatch(logout()),
  toggleForm: () => dispatch(toggleForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
