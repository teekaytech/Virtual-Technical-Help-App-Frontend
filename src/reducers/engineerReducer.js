import {
  engineersInitialState,
  FETCH_CURRENT_ENGINEER_FAILURE,
  FETCH_CURRENT_ENGINEER_REQUEST,
  FETCH_CURRENT_ENGINEER_SUCCESS,
} from '../actions/types';

const engineerReducer = (state = engineersInitialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_ENGINEER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CURRENT_ENGINEER_SUCCESS:
      return {
        ...state,
        loading: false,
        engineer: action.payload,
        error: '',
      };
    case FETCH_CURRENT_ENGINEER_FAILURE:
      return {
        ...state,
        loading: false,
        engineer: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default engineerReducer;
