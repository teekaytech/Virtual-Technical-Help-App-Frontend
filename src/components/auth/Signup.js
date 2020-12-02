import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signup } from '../../actions/auth';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = e => {
    const { signup } = this.props;
    const {
      name,
      username,
      email,
      password,
      passwordConfirmation,
    } = this.state;
    const user = {
      name, username, email, password, passwordConfirmation,
    };
    e.preventDefault();
    signup(user);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      name, username, email, password, passwordConfirmation,
    } = this.state;
    return (
      <div>
        <h3>Registration form</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name here"
            value={name}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="username"
            placeholder="Enter username here"
            onChange={this.handleChange}
            value={username}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email here"
            value={email}
            onChange={this.handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password here"
            value={password}
            onChange={this.handleChange}
          />

          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Re-enter the password"
            value={passwordConfirmation}
            onChange={this.handleChange}
          />

          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

Signup.defaultProps = {
  signup: PropTypes.func,
};

Signup.propTypes = {
  signup: PropTypes.func,
};

const mapStateToProps = state => ({
  details: state.auth,
});

const mapDispatchToProps = dispatch => ({
  signup: userPparams => dispatch(signup(userPparams)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
