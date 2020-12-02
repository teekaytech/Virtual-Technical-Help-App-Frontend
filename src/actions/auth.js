import Axios from 'axios';
import {
  LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE, LOGOUT,
} from './types';

export const userLoginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const userLoginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const userLoginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const userLogout = () => ({
  type: LOGOUT,
});

export const login = (username, password) => dispatch => {
  try {
    const user = { username, password };
    dispatch(userLoginRequest());
    Axios.post('https://boiling-basin-10755.herokuapp.com//api/v1/login', user)
      .then(response => {
        if (response.data.logged_in) {
          localStorage.setItem('token', response.data.token);
          dispatch(userLoginSuccess(response.data.user));
        }
      })
      .catch(error => {
        dispatch(userLoginFailure(error.message));
      });
  } catch (error) {
    dispatch(userLoginFailure(error.message));
  }
};

export const signup = userParams => dispatch => {
  try {
    dispatch(userLoginRequest());
    Axios.post('https://boiling-basin-10755.herokuapp.com/api/v1/users', userParams)
      .then(response => {
        if (response.data.created) {
          localStorage.setItem('token', response.data.token);
          dispatch(userLoginSuccess(response.data.user));
        }
        if (!response.data.created) {
          dispatch(userLoginFailure(response.data.error_messages));
        }
      })
      .catch(error => {
        dispatch(userLoginFailure(error.message));
      });
  } catch (error) {
    dispatch(userLoginFailure(error.message));
  }
};

export const checkLoginStatus = () => dispatch => {
  try {
    dispatch(userLoginRequest());
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
            dispatch(userLoginFailure(response.data.message));
          }
        })
        .catch(error => {
          dispatch(userLoginFailure(error.message));
        });
    } else {
      dispatch(userLoginFailure('You are not authorized. Please login.'));
    }
  } catch (error) {
    dispatch(userLoginFailure(error.message));
  }
};

export const logout = () => dispatch => {
  try {
    dispatch(userLoginRequest());
    localStorage.removeItem('token');
    Axios.delete('https://boiling-basin-10755.herokuapp.com/api/v1/logout')
      .then(response => {
        if (response.data.logged_out) {
          dispatch(userLogout());
        }
      })
      .catch(error => {
        dispatch(userLoginFailure(error.message));
      });
  } catch (error) {
    dispatch(userLoginFailure(error.message));
  }
};
