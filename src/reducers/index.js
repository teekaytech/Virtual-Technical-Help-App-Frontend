import { combineReducers } from 'redux';
import authReducer from './authReducer';
import engineersReducer from './engineersReducer';
import engineerReducer from './engineerReducer';

const rootReducer = combineReducers({
  auth: authReducer, engineers: engineersReducer, engineer: engineerReducer,
});

export default rootReducer;
