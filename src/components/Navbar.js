import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
import { NOT_LOGGED_IN } from '../actions/types';

const Navbar = ({
  logout,
  username,
  userId,
  loggedIn,
  toggleForm,
  loadForm,
}) => {
  const handleClick = () => {
    logout();
  };

  if (loggedIn === NOT_LOGGED_IN) {
    return (
      <div>
        <button
          type="button"
          onClick={() => toggleForm()}
          className="btn btn-primary"
        >
          { loadForm ? 'Sign Up' : 'Login'}
        </button>
      </div>
    );
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to={`/user/${userId}/appointments`}>Appointments</Link>
        </li>
        <li>
          <Link to="/engineers">Engineers</Link>
        </li>
        <li>
          <button type="button" onClick={() => handleClick()}>
            Logout
          </button>
        </li>
      </ul>
      <h4>
        Current User:
        {' '}
        {username}
      </h4>
    </nav>
  );
};

Navbar.defaultProps = {
  username: undefined,
  userId: undefined,
};

Navbar.propTypes = {
  username: PropTypes.string,
  logout: PropTypes.func.isRequired,
  userId: PropTypes.number,
  loggedIn: PropTypes.string.isRequired,
  toggleForm: PropTypes.func.isRequired,
  loadForm: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  username: state.auth.user.username,
  userId: state.auth.user.id,
  loggedIn: state.auth.loggedIn,
  loadForm: state.auth.toggleForm,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
