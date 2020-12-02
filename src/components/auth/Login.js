import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../actions/auth';

const Login = ({ loginUser }) => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    loginUser(username, password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          name="username"
          placeholder="Enter username here"
          onChange={event => {
            setusername(event.target.value);
          }}
          required
        />

        <input
          type="password"
          name="password"
          placeholdeSignupr="Enter password here"
          onChange={event => {
            setpassword(event.target.value);
          }}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

Login.defaultProps = {
  loginUser: PropTypes.func,
};

Login.propTypes = {
  loginUser: PropTypes.func,
};

const mapStateToProps = state => ({
  details: state.auth,
});

const mapDispatchToProps = dispatch => ({
  logginUser: (username, password) => dispatch(loginUser(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
