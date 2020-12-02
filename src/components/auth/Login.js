import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login }) => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div>
      <h3>Login Form</h3>
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
          placeholder="Enter password here"
          onChange={event => {
            setpassword(event.target.value);
          }}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

Login.defaultProps = {
  login: PropTypes.func,
};

Login.propTypes = {
  login: PropTypes.func,
};

// const mapStateToProps = state => ({
//   details: state.auth,
// });

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(login(username, password)),
});

export default connect(null, mapDispatchToProps)(Login);
