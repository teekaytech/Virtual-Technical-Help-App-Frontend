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
import styles from './css/app.module.scss';

const App = ({
  checkLoginStatus,
  status,
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

  const details = () => (
    <div>
      <h1 className={`${styles.mainTitle} mb-2`}>Virtual Technical Help</h1>
      <p
        className={`${styles.details} font-weight-bolder mx-5 my-4 text-large`}
      >
        This app is built to connect micronauts (microverse students) who may
        need technical help to Technical Support Engineers, using microverse
        (an online training school for remote software developers) as a case
        study.
      </p>
    </div>
  );

  const authForms = () => {
    if (formFlag) {
      return (
        <article className={styles.authForm}>
          <Login />
          <p>
            New User?
            {' '}
            <button
              type="button"
              onClick={() => toggleForm()}
              className="btn btn-primary"
            >
              Sign up here
            </button>
          </p>
        </article>
      );
    }
    return (
      <article className={styles.authForm}>
        <Signup />
        <p>
          Existing User?
          {' '}
          <button
            type="button"
            onClick={() => toggleForm()}
            className="btn btn-primary"
          >
            Log in here
          </button>
        </p>
      </article>
    );
  };

  return (
    <BrowserRouter>
      <main className={`${styles.app}`} id="main">
        <header>
          <Navbar toggleForm={toggleForm} />
        </header>
        <div
          className={`${styles.mainContent} mx-5 px-3 py-5 text-center text-white`}
        >
          {status === LOGGED_IN ? loggedInScreen() : (
            <div>
              {details()}
              {authForms()}
            </div>
          )}
        </div>
      </main>
    </BrowserRouter>
  );
};

App.propTypes = {
  checkLoginStatus: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  logoutUser: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
  formFlag: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  status: state.auth.loggedIn,
  formFlag: state.auth.toggleForm,
});

const mapDispatchToProps = dispatch => ({
  checkLoginStatus: () => dispatch(checkLoginStatus()),
  logoutUser: () => dispatch(logout()),
  toggleForm: () => dispatch(toggleForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
