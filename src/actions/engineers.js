import Axios from './import';
import { requestFailure, requestPending } from './auth';
import {
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
    Axios.get('https://boiling-basin-10755.herokuapp.com//api/v1/engineers')
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
