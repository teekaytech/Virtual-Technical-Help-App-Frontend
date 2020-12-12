/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { signup } from '../../actions/auth';
import styles from '../../css/auth.module.scss';
import Spinner from '../Spinner';

const Signup = ({ signup, loading, error }) => {
  const initialValues = {
    name: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const SignUnSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(6, 'Name is too short - should be 6 characters minimum'),

    username: Yup.string()
      .required('Username is required')
      .min(6, 'Username is too short - should be 6 characters minimum'),

    email: Yup.string().email('Invalid Email address').required('Email is required'),

    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password is too short - should be 6 chars minimum'),

    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignUnSchema}
      onSubmit={values => {
        signup(values);
      }}
    >
      {formik => {
        const {
          errors, touched, isValid, dirty,
        } = formik;
        return (
          <div className="form-container">
            <h4 className="mb-3">Registration form</h4>
            {
              error === 'You are not authorized. Please login.' ? ''
                : (<span className="d-inline-block mb-1 text-danger">{error}</span>)
            }
            <Form>
              <div className="form-group">
                <label htmlFor="name">
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Name here"
                    className={`${
                      errors.name && touched.name ? 'is-invalid' : 'is-valid'
                    } form-control`}
                  />
                </label>
                <ErrorMessage
                  name="name"
                  component="span"
                  className={`${styles.error} d-block`}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter username here"
                    className={`${
                      errors.username && touched.username
                        ? 'is-invalid'
                        : 'is-valid'
                    } form-control`}
                  />
                </label>
                <ErrorMessage
                  name="username"
                  component="span"
                  className={`${styles.error} d-block`}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email here"
                    className={`${
                      errors.email && touched.email ? 'is-invalid' : 'is-valid'
                    } form-control`}
                  />
                </label>
                <ErrorMessage
                  name="email"
                  component="span"
                  className={`${styles.error} d-block`}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter password here"
                    className={`${
                      errors.password && touched.password
                        ? 'is-invalid'
                        : 'is-valid'
                    } form-control`}
                  />
                </label>
                <ErrorMessage
                  name="password"
                  component="span"
                  className={`${styles.error} d-block`}
                />
              </div>

              <div className="form-group">
                <label htmlFor="passwordConfirmation">
                  <Field
                    type="password"
                    name="passwordConfirmation"
                    id="passwordConfirmation"
                    placeholder="Re-enter password here"
                    className={`${
                      errors.passwordConfirmation
                      && touched.passwordConfirmation
                        ? 'is-invalid'
                        : 'is-valid'
                    } form-control`}
                  />
                </label>
                <ErrorMessage
                  name="passwordConfirmation"
                  component="span"
                  className={`${styles.error} d-block`}
                />
              </div>

              <button
                type="submit"
                className={`${
                  !(dirty && isValid) ? 'disabled-btn' : ''
                } btn btn-light mb-4`}
                disabled={!(dirty && isValid)}
              >
                {loading ? <Spinner /> : ''}
                {' '}
                Register
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  signup: userPparams => dispatch(signup(userPparams)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
