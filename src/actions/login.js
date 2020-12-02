import { Axios } from 'axios';
import { FormData } from 'form-data';
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

const loginUser = (username, password) => dispatch => {
  try {
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);

    const config = {
      method: 'post',
      url: 'https://boiling-basin-10755.herokuapp.com//api/v1/login',
      headers: {
        ...data.getHeaders(),
      },
      data,
    };
    dispatch(userLoginSuccess());
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
  }
};

export default loginUser;
