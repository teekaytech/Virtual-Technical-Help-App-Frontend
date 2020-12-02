import {
  LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, initialState, LOGGED_IN, NOT_LOGGED_IN,
} from '../actions/types';

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: LOGGED_IN,
        users: action.payload,
        error: '',
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        loggedIn: NOT_LOGGED_IN,
        user: {},
        appointments: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
