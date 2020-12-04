import Axios from 'axios';
import { requestFailure, requestPending } from './auth';
import { ADD_APPOINTMENT_FAILURE, ADD_APPOINTMENT_SUCCESS, APPOINTMENT_ACTION_REQUEST } from './types';

export const makeAppointment = () => ({
  type: ADD_APPOINTMENT_SUCCESS,
});

export const addAppointment = data => dispatch => {
  try {
    dispatch(requestPending(APPOINTMENT_ACTION_REQUEST));
    const token = localStorage.getItem('token');
    Axios.post(
      'https://boiling-basin-10755.herokuapp.com//api/v1/appointments', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then(response => {
        if (response.status === 201) {
          dispatch(makeAppointment());
        }
      })
      .catch(error => {
        dispatch(requestFailure(ADD_APPOINTMENT_FAILURE, error.message));
      });
  } catch (error) {
    dispatch(requestFailure(ADD_APPOINTMENT_FAILURE, error.message));
  }
};
