import {
  engineersInitialState,
  FETCH_ENGINEERS_FAILURE,
  FETCH_ENGINEERS_PENDING,
  FETCH_ENGINEERS_SUCCESS,
} from '../actions/types';

const engineersReducer = (state = engineersInitialState, action) => {
  switch (action.type) {
    case FETCH_ENGINEERS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ENGINEERS_SUCCESS:
      return {
        ...state,
        loading: false,
        engineers: action.payload,
        error: '',
      };
    case FETCH_ENGINEERS_FAILURE:
      return {
        ...state,
        loading: false,
        engineers: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default engineersReducer;
