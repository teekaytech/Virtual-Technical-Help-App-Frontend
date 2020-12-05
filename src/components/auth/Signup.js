/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { signup } from '../../actions/auth';

const Signup = ({ signup }) => {
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
            <h3>Registration form</h3>
            <Form>
              <div className="form-row">
                <label htmlFor="name">Name:</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Name here"
                  className={errors.name && touched.name ? 'input-error' : null}
                />
                <ErrorMessage name="name" component="span" className="error" />
              </div>

              <div className="form-row">
                <label htmlFor="username">Username: </label>
                <Field
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter username here"
                  className={
                    errors.username && touched.username ? 'input-error' : null
                  }
                />
                <ErrorMessage
                  name="username"
                  component="span"
                  className="error"
                />
              </div>

              <div className="form-row">
                <label htmlFor="username">Email: </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email here"
                  className={
                    errors.email && touched.email ? 'input-error' : null
                  }
                />
                <ErrorMessage name="email" component="span" className="error" />
              </div>

              <div className="form-row">
                <label htmlFor="password">Password: </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password here"
                  className={
                    errors.password && touched.password ? 'input-error' : null
                  }
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error"
                />
              </div>

              <div className="form-row">
                <label htmlFor="passwordConfirmation">Confirm Password: </label>
                <Field
                  type="password"
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  placeholder="Re-enter password here"
                  className={
                    errors.passwordConfirmation && touched.passwordConfirmation
                      ? 'input-error'
                      : null
                  }
                />
                <ErrorMessage
                  name="passwordConfirmation"
                  component="span"
                  className="error"
                />
              </div>

              <button
                type="submit"
                className={!(dirty && isValid) ? 'disabled-btn' : ''}
                disabled={!(dirty && isValid)}
              >
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
};

const mapStateToProps = state => ({
  details: state.auth,
});

const mapDispatchToProps = dispatch => ({
  signup: userPparams => dispatch(signup(userPparams)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
