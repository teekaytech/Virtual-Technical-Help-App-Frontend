import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import styles from '../../css/auth.module.scss';
import Spinner from '../Spinner';

const Login = ({ login, loading, error }) => {
  const intialValues = { username: '', password: '' };
  const [loginDetails, setLoginDetails] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = () => {
    login(loginDetails);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const validate = values => {
    const errors = {};
    if (!values.username) {
      errors.email = 'Hint: Username cannot be blank';
    }
    if (!values.password) {
      errors.password = 'Hint: Password cannot be blank';
    } else if (values.password.length < 6) {
      errors.password = 'Password is definitely more than 5 characters';
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [formErrors, isSubmitting]);

  const handleSubmit = e => {
    e.preventDefault();
    setFormErrors(validate(loginDetails));
    setIsSubmitting(true);
  };

  return (
    <div>
      <h4 className="mb-4">Log in to continue</h4>
      <span className="d-inline-block mb-2 text-danger">{error}</span>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="username">
            <input
              type="username"
              name="username"
              id="username"
              placeholder="Enter username here"
              value={loginDetails.username}
              onChange={handleChange}
              className={`${formErrors.email && 'is-invalid'} form-control`}
            />
          </label>
          {formErrors.email && (
            <span className={`${styles.error} d-block`}>
              {formErrors.email}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              id="password"
              value={loginDetails.password}
              placeholder="Enter password here"
              onChange={handleChange}
              className={`${formErrors.password && 'is-invalid'} form-control`}
            />
          </label>
          {formErrors.password && (
            <span className={`${styles.error} d-block`}>
              {formErrors.password}
            </span>
          )}
        </div>
        <button type="submit" className="btn btn-light mb-3">
          {loading ? <Spinner /> : ''}
          Login
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(login(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
