import Axios from 'axios';
import { requestFailure, requestPending } from './auth';
import {
  ADD_APPOINTMENT_FAILURE,
  ADD_APPOINTMENT_SUCCESS,
  APPOINTMENT_ACTION_REQUEST,
  FETCH_APPOINTMENTS_FAILURE,
  FETCH_APPOINTMENTS_SUCCESS,
  API_URL,
} from './types';

const makeAppointment = () => ({
  type: ADD_APPOINTMENT_SUCCESS,
});

const fetchAllAppointments = appointments => ({
  type: FETCH_APPOINTMENTS_SUCCESS,
  payload: appointments,
});

export const addAppointment = data => dispatch => {
  try {
    dispatch(requestPending(APPOINTMENT_ACTION_REQUEST));
    const token = localStorage.getItem('token');
    Axios.post(`${API_URL}/appointments`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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

export const fetchAppointments = () => dispatch => {
  try {
    dispatch(requestPending(APPOINTMENT_ACTION_REQUEST));
    const token = localStorage.getItem('token');
    Axios.get(`${API_URL}/appointments`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchAllAppointments(response.data));
        }
      })
      .catch(error => {
        dispatch(requestFailure(FETCH_APPOINTMENTS_FAILURE, error.message));
      });
  } catch (error) {
    dispatch(requestFailure(FETCH_APPOINTMENTS_FAILURE, error.message));
  }
};
