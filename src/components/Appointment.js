/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { addAppointment } from '../actions/appointment';
import styles from '../css/appointment.module.scss';
import Spinner from './Spinner';

const Appointment = ({
  engineerId, createAppointment, error, loading, createStatus,
}) => {
  const initialValues = {
    date: '',
    duration: '',
  };

  const appointmentSchema = Yup.object().shape({
    date: Yup.date()
      .required('Date is required'),

    duration: Yup.number()
      .required('Duration is required'),
  });

  const submitForm = values => {
    const status = new Date(values.date) < new Date() ? 'Past' : 'Upcoming';
    const data = {
      engineer_id: engineerId, date: values.date, duration: values.duration, status,
    };
    createAppointment(data);
  };

  const message = () => (error === '' && createStatus ? (
    <span className="text-success">Appointment booked successfully.</span>
  ) : (
    <span className="text-danger">
      {error}
    </span>
  ));

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={appointmentSchema}
      onSubmit={values => { submitForm(values); }}
    >
      {formik => {
        const {
          errors, touched, isValid, dirty,
        } = formik;
        return (
          <div className={`${styles.main} mt-5 pl-3 border-top pt-3`}>
            <h6 className="my-4">Make Appointment</h6>
            <Form>
              <div className="form-group">
                <label htmlFor="date">Select Date:</label>
                <Field
                  type="datetime-local"
                  name="date"
                  id="date"
                  className={`${
                    errors.date && touched.date ? 'is-invalid' : 'is-valid'
                  } form-control`}
                />

                <ErrorMessage
                  name="date"
                  component="span"
                  className="text-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="duration">Estimated Duration (Minutes):</label>
                <Field
                  type="number"
                  name="duration"
                  id="duration"
                  className={`${
                    errors.duration && touched.duration
                      ? 'is-invalid'
                      : 'is-valid'
                  } form-control`}
                />
                <ErrorMessage
                  name="duration"
                  component="span"
                  className="text-danger"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className={`${!(dirty && isValid) ? 'disabled-btn' : ''} btn btn-success`}
                  disabled={!(dirty && isValid)}
                >
                  { loading ? <Spinner /> : ''}
                  Book an Appointment
                </button>
              </div>
            </Form>
            <div className="mt-3" />
            <p>
              { loading ? '' : message() }
            </p>
          </div>
        );
      }}
    </Formik>
  );
};

Appointment.defaultProps = {
  error: PropTypes.string,
};

Appointment.propTypes = {
  engineerId: PropTypes.number.isRequired,
  createAppointment: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  createStatus: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  error: state.appointments.error,
  loading: state.appointments.loading,
  createStatus: state.appointments.createStatus,
});

const mapDispatchToProps = dispatch => ({
  createAppointment: data => dispatch(addAppointment(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Appointment);
