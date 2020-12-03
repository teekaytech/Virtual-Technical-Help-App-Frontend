import Axios from './import';
import {
  LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE, LOGOUT, LOGOUT_REQUEST, LOGOUT_FAILURE,
} from './types';

export const requestPending = actionType => ({
  type: actionType,
});

export const userLoginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const requestFailure = (actionType, error) => ({
  type: actionType,
  payload: error,
});

export const userLogout = () => ({
  type: LOGOUT,
});

export const login = (username, password) => dispatch => {
  try {
    const user = { username, password };
    dispatch(requestPending(LOGIN_REQUEST));
    Axios.post('https://boiling-basin-10755.herokuapp.com//api/v1/login', user)
      .then(response => {
        if (response.data.logged_in) {
          localStorage.setItem('token', response.data.token);
          dispatch(userLoginSuccess(response.data.user));
        }
      })
      .catch(error => {
        dispatch(requestFailure(LOGIN_FAILURE, error.message));
      });
  } catch (error) {
    dispatch(requestFailure(LOGIN_FAILURE, error.message));
  }
};

export const signup = userParams => dispatch => {
  try {
    dispatch(requestPending(LOGIN_REQUEST));
    Axios.post('https://boiling-basin-10755.herokuapp.com/api/v1/users', userParams)
      .then(response => {
        if (response.data.created) {
          localStorage.setItem('token', response.data.token);
          dispatch(userLoginSuccess(response.data.user));
        }
        if (!response.data.created) {
          dispatch(requestFailure(LOGIN_FAILURE, response.data.error_messages));
        }
      })
      .catch(error => {
        dispatch(requestFailure(LOGIN_FAILURE, error.message));
      });
  } catch (error) {
    dispatch(requestFailure(LOGIN_FAILURE, error.message));
  }
};

export const checkLoginStatus = () => dispatch => {
  try {
    dispatch(requestPending(LOGIN_REQUEST));
    const token = localStorage.getItem('token');
    if (token) {
      Axios.get('https://boiling-basin-10755.herokuapp.com/api/v1/auto_login', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (response.data.logged_in) {
            dispatch(userLoginSuccess(response.data.user));
          }
          if (!response.data.logged_in) {
            dispatch(requestFailure(LOGIN_FAILURE, response.data.message));
          }
        })
        .catch(error => {
          dispatch(requestFailure(LOGIN_FAILURE, error.message));
        });
    } else {
      dispatch(
        requestFailure(LOGIN_FAILURE, 'You are not authorized. Please login.'),
      );
    }
  } catch (error) {
    dispatch(requestFailure(LOGIN_FAILURE, error.message));
  }
};

export const logout = () => dispatch => {
  try {
    dispatch(requestPending(LOGOUT_REQUEST));
    localStorage.removeItem('token');
    Axios.delete('https://boiling-basin-10755.herokuapp.com/api/v1/logout')
      .then(response => {
        if (response.data.logged_out) {
          dispatch(userLogout());
        }
      })
      .catch(error => {
        dispatch(requestFailure(LOGOUT_FAILURE, error.message));
      });
  } catch (error) {
    dispatch(requestFailure(LOGOUT_FAILURE, error.message));
  }
};
