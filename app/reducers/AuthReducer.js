import {
  USER_LOGIN_START,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from '../actions/types';

const INITIAL_AUTH_STATE = {
  isLoggedIn: false,
  userInfo: null
};

export default (state = INITIAL_AUTH_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN_START:
      return { ...state, loading: true, error: '' };
    case USER_LOGIN_SUCCESS:
      return action.payload;
    case USER_LOGOUT:
      return INITIAL_AUTH_STATE;
    default:
      return state;
  }
};
