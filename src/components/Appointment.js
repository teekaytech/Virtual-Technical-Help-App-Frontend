/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { addAppointment } from '../actions/appointment';

const Appointment = ({ engineerId, createAppointment }) => {
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
          <div className="appointment-form-container">
            <h4>New Appointment</h4>
            <Form>
              <div className="form-row">
                <label htmlFor="date">
                  Date:
                  <Field
                    type="datetime-local"
                    name="date"
                    id="date"
                    className={
                      errors.date && touched.date ? 'input-error' : null
                    }
                  />
                </label>
                <ErrorMessage name="date" component="span" className="error" />
              </div>

              <div className="form-row">
                <label htmlFor="duration">
                  Estimated Duration (Minutes):
                  <Field
                    type="number"
                    name="duration"
                    id="duration"
                    className={
                      errors.duration && touched.duration ? 'input-error' : null
                    }
                  />
                </label>
                <ErrorMessage
                  name="duration"
                  component="span"
                  className="error"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className={!(dirty && isValid) ? 'disabled-btn' : ''}
                  disabled={!(dirty && isValid)}
                >
                  Make Appointment
                </button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
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
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  createAppointment: data => dispatch(addAppointment(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Appointment);
