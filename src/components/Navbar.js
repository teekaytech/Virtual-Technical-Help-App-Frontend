import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Navbar = ({ status }) => (
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
  </nav>
);

Navbar.defaultProps = {
  status: PropTypes.string,
};

Navbar.propTypes = {
  status: PropTypes.string,
};

const mapStateToProps = state => ({
  status: state.auth.loggedIn,
});

export default connect(mapStateToProps)(Navbar);
