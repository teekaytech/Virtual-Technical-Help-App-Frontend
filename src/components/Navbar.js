import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';

const Navbar = ({ status, logout }) => {
  const handleClick = () => {
    logout();
  };
  return (
    <nav>
      <Link to="/">
        <h1>Home</h1>
      </Link>
      <Link to="/user/:user_id/dashboard">
        <h1>Dashboard</h1>
      </Link>
      <h4>
        Loggin Status:
        {' '}
        {status}
      </h4>
      <button type="button" onClick={() => handleClick()}>Logout</button>
    </nav>
  );
};

Navbar.defaultProps = {
  status: PropTypes.string,
  logout: PropTypes.func,
};

Navbar.propTypes = {
  status: PropTypes.string,
  logout: PropTypes.func,
};

const mapStateToProps = state => ({
  status: state.auth.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
