import Axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE } from './types';

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

export const loginUser = (username, password) => dispatch => {
  try {
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);

    const config = {
      method: 'post',
      url: 'https://boiling-basin-10755.herokuapp.com/api/v1/login',
      headers: {
        ...data.getHeaders(),
      },
      data,
    };
    dispatch(userLoginRequest());
    Axios(config)
      .then(response => {
        if (response.data.logged_in) {
          console.log(response.data);
          dispatch(userLoginSuccess(response.data));
        }
        if (response.data.status === 'NOT_LOGGED_IN') {
          console.log(response.data.error);
          dispatch(userLoginFailure(response.data.error));
        }
        console.log(JSON.stringify(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
    dispatch(userLoginFailure(error));
  }
};

export const signup = userParams => dispatch => {
  try {
    dispatch(userLoginRequest());
    Axios.post('https://boiling-basin-10755.herokuapp.com/api/v1/users', userParams)
      .then(response => {
        console.log(response.data);
        if (response.data.created) {
          localStorage.setItem('token', response.data.token);
          dispatch(userLoginSuccess(response.data.user));
        }
        if (!response.data.created) {
          dispatch(userLoginFailure(response.data.error_messages));
        }
      })
      .catch(error => {
        dispatch(userLoginFailure(error));
      });
  } catch (error) {
    dispatch(userLoginFailure(error));
  }
};

export const checkLoginStatus = () => dispatch => {
  try {
    dispatch(userLoginRequest());
    const token = localStorage.getItem('token');
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
        dispatch(userLoginFailure(error));
      });
  } catch (error) {
    dispatch(userLoginFailure(error));
  }
};
