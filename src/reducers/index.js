import { combineReducers } from 'redux';
import authReducer from './authReducer';
import engineersReducer from './engineersReducer';
import engineerReducer from './engineerReducer';
import appointmentsReducer from './appointmentsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  engineers: engineersReducer,
  engineer: engineerReducer,
  appointments: appointmentsReducer,
});

export default rootReducer;
