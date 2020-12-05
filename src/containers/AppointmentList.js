import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAppointments } from '../actions/appointment';

function AppointmentList({ fetchAppointments, appointments }) {
  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const allAppointments = Object.keys(appointments).length ? (
    appointments.map((appointment, sn) => (
      <tr key={appointment.id}>
        <td>{sn + 1}</td>
        <td>{new Date(appointment.date).toDateString()}</td>
        <td>{`${appointment.duration} Minutes`}</td>
        <td>{`${appointment.engineer} (${appointment.location})`}</td>
        <td>{new Date(appointment.date_created).toDateString()}</td>
        <td>{appointment.status}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6">No appointments made yet.</td>
    </tr>
  );

  return (
    <div>
      <h1>All Appointments</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Appointment Date</th>
            <th>Expected Duration</th>
            <th>Engineer (Location)</th>
            <th>Date Submitted</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allAppointments}
        </tbody>
      </table>
    </div>
  );
}

AppointmentList.propTypes = {
  appointments: PropTypes.arrayOf(Object).isRequired,
  fetchAppointments: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  appointments: state.appointments.appointments,
});

const mapDispatchToProps = dispatch => ({
  fetchAppointments: () => dispatch(fetchAppointments()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentList);
