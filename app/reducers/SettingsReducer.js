import { Constants } from 'expo';
import { SETTINGS_CHANGED, SETTINGS_RESET } from '../actions/types';

const INITIAL_SETTINGS_STATE = {
  useTouchId: false,
  useGoogleMap: Constants.isDevice, // google maps works better in SE Asia
  useMockData: true,
  apiUrl: 'https://vino9.net/api/cams'
};

export default (state = INITIAL_SETTINGS_STATE, action) => {
  switch (action.type) {
    case SETTINGS_CHANGED:
      return action.payload;
    case SETTINGS_RESET:
      return INITIAL_SETTINGS_STATE;
    default:
      return state;
  }
};
