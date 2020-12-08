import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAppointments } from '../actions/appointment';
import styles from '../css/appointment.module.scss';

function AppointmentList({ fetchAppointments, appointments }) {
  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const allAppointments = Object.keys(appointments).length ? (
    appointments.map((appointment, sn) => (
      <tr key={appointment.id}>
        <th scope="row">{sn + 1}</th>
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
    <section className={`${styles.appointments} bg-white p-4 table-responsive`}>
      <h4 className="text-uppercase font-weight-bolder mb-4">
        All Appointments
      </h4>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Appointment Date</th>
            <th scope="col">Expected Duration</th>
            <th scope="col">Engineer (Location)</th>
            <th scope="col">Date Submitted</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>{allAppointments}</tbody>
      </table>
    </section>
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
