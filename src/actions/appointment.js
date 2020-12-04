import Axios from 'axios';
import { requestFailure } from './auth';
import { ADD_APPOINTMENT_FAILURE, ADD_APPOINTMENT_SUCCESS } from './types';

export const makeAppointment = appointment => ({
  type: ADD_APPOINTMENT_SUCCESS,
  payload: appointment,
});

export const addAppointment = data => dispatch => {
  try {
    Axios.post('https://boiling-basin-10755.herokuapp.com//api/v1/login', data)
      .then(response => {
        // if (response.data.logged_in) {
        // localStorage.setItem('token', response.data.token);
        // dispatch(makeAppointment(response.data.user));
        // }
        console.loog(response);
      })
      .catch(error => {
        console.log('Catch Error:', error);
        dispatch(requestFailure(ADD_APPOINTMENT_FAILURE, error.message));
      });
  } catch (error) {
    console.log('Try/Catch error', error);
    dispatch(requestFailure(ADD_APPOINTMENT_FAILURE, error.message));
  }
};
