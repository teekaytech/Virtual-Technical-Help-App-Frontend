import Axios from './import';
import { requestFailure, requestPending } from './auth';
import {
  FETCH_CURRENT_ENGINEER_REQUEST,
  FETCH_CURRENT_ENGINEER_FAILURE,
  FETCH_CURRENT_ENGINEER_SUCCESS,
} from './types';

const fetchCurrentEngineersSuccess = engineer => ({
  type: FETCH_CURRENT_ENGINEER_SUCCESS,
  payload: engineer,
});

const fetchCurrentEngineer = id => dispatch => {
  try {
    dispatch(requestPending(FETCH_CURRENT_ENGINEER_REQUEST));
    Axios.get(`https://boiling-basin-10755.herokuapp.com//api/v1/engineers/${id}`)
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
