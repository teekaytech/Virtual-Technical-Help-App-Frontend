import Axios from './import';
import { requestFailure, requestPending } from './auth';
import {
  API_URL,
  FETCH_ENGINEERS_FAILURE,
  FETCH_ENGINEERS_PENDING,
  FETCH_ENGINEERS_SUCCESS,
} from './types';

const fetchEngineersSuccess = engineers => ({
  type: FETCH_ENGINEERS_SUCCESS,
  payload: engineers,
});

const fetchEngineers = () => dispatch => {
  try {
    dispatch(requestPending(FETCH_ENGINEERS_PENDING));
    Axios.get(`${API_URL}/engineers`)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchEngineersSuccess(response.data));
        }
      })
      .catch(error => {
        dispatch(requestFailure(FETCH_ENGINEERS_FAILURE, error.message));
      });
  } catch (error) {
    dispatch(requestFailure(FETCH_ENGINEERS_FAILURE, error.message));
  }
};

export default fetchEngineers;
