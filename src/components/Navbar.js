import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';

const Navbar = ({ logout, username, userId }) => {
  const handleClick = () => {
    logout();
  };
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
          <button type="button" onClick={() => handleClick()}>Logout</button>
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
  username: PropTypes.string,
  logout: PropTypes.func,
};

Navbar.propTypes = {
  username: PropTypes.string,
  logout: PropTypes.func,
  userId: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  username: state.auth.user.username,
  userId: state.auth.user.id,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
