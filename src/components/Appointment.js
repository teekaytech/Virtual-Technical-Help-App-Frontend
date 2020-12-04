import React, { useState } from 'react';

const Appointment = () => {
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const status = true;

  return (
    <div>
      <h4>New Appointment</h4>
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
        <input type="hidden" name="user_id" value={status} />
        <input type="hidden" name="engineer_id" value={status} />
        <input type="hidden" name="status" value={status} />
      </div>

      <form />
    </div>
  );
};

export default Appointment;
