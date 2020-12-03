import { combineReducers } from 'redux';
import authReducer from './authReducer';
import engineersReducer from './engineersReducer';

const rootReducer = combineReducers({
  auth: authReducer, engineers: engineersReducer,
});

export default rootReducer;
