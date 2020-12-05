import Axios from './import';
import { requestFailure, requestPending } from './auth';
import {
  FETCH_CURRENT_ENGINEER_REQUEST,
  FETCH_CURRENT_ENGINEER_FAILURE,
  FETCH_CURRENT_ENGINEER_SUCCESS,
  API_URL,
} from './types';

const fetchCurrentEngineersSuccess = engineer => ({
  type: FETCH_CURRENT_ENGINEER_SUCCESS,
  payload: engineer,
});

const fetchCurrentEngineer = id => dispatch => {
  try {
    dispatch(requestPending(FETCH_CURRENT_ENGINEER_REQUEST));
    Axios.get(`${API_URL}/engineers/${id}`)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchCurrentEngineersSuccess(response.data));
        }
      })
      .catch(error => {
        dispatch(requestFailure(FETCH_CURRENT_ENGINEER_FAILURE, error.message));
      });
  } catch (error) {
    dispatch(requestFailure(FETCH_CURRENT_ENGINEER_FAILURE, error.message));
  }
};

export default fetchCurrentEngineer;
