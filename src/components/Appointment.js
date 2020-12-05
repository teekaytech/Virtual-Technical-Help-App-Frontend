import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAppointment } from '../actions/appointment';

const Appointment = ({ engineerId, createAppointment }) => {
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const status = new Date(date) < new Date() ? 'Past' : 'Upcoming';

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      engineer_id: engineerId, date, duration, status,
    };
    createAppointment(data);
  };

  return (
    <div>
      <h4>New Appointment</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">
            Date:
            <input
              type="datetime-local"
              name="date"
              id="date"
              value={date}
              onChange={event => {
                setDate(event.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label htmlFor="duration">
            Estimated Duration (Minutes):
            <input
              type="number"
              name="duration"
              id="date"
              value={duration}
              onChange={event => {
                setDuration(event.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <button type="submit">Make Appointment</button>
        </div>
      </form>
    </div>
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
