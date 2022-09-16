import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGGED_IN,
  NOT_LOGGED_IN,
  LOGOUT,
  authInitialState,
  TOGGLE_FORM,
} from '../actions/types';

const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case TOGGLE_FORM:
      return {
        ...state,
        toggleForm: !state.toggleForm,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: LOGGED_IN,
        user: action.payload,
        error: '',
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        loggedIn: NOT_LOGGED_IN,
        user: {},
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        loggedIn: NOT_LOGGED_IN,
        user: {},
        error: '',
      };
    default:
      return state;
  }
};

export default authReducer;
