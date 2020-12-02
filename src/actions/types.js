export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const NOT_LOGGED_IN = 'NOT_LOGGED_IN';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGOUT = 'LOGOUT';
export const initialState = {
  loggedIn: 'NOT_LOGGED_IN',
  user: {},
  appointments: [],
  error: '',
  loading: false,
};
