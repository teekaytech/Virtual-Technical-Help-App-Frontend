export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const NOT_LOGGED_IN = 'NOT_LOGGED_IN';
export const LOGGED_IN = 'LOGGED_IN';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_REQUEST';

export const FETCH_ENGINEERS_PENDING = 'FETCH_ENGINEERS_REQUEST';
export const FETCH_ENGINEERS_SUCCESS = 'FETCH_ENGINEERS_SUCCESS';
export const FETCH_ENGINEERS_FAILURE = 'FETCH_ENGINEERS_FAILURE';

export const FETCH_CURRENT_ENGINEER_REQUEST = 'FETCH_CURRENT_ENGINEER_REQUEST';
export const FETCH_CURRENT_ENGINEER_SUCCESS = 'FETCH_CURRENT_ENGINEER_SUCCESS';
export const FETCH_CURRENT_ENGINEER_FAILURE = 'FETCH_CURRENT_ENGINEER_FAILURE';

export const ADD_APPOINTMENT_SUCCESS = 'ADD_APPOINTMENT_SUCCESS';
export const ADD_APPOINTMENT_FAILURE = 'ADD_APPOINTMENT_FAILURE';

export const authInitialState = {
  loggedIn: 'NOT_LOGGED_IN',
  user: {},
  error: '',
  loading: false,
};

export const engineersInitialState = {
  loading: false,
  engineers: [],
  engineer: {},
  error: '',
};
