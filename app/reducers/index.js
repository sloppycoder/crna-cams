import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import settingsReducer from './SettingsReducer';

export default combineReducers({
  auth: authReducer,
  settings: settingsReducer
});
