import { combineReducers } from 'redux';
import auth from './auth-reducer';
import park from './park-reducer';

export default combineReducers({
  auth,
  park,
});
