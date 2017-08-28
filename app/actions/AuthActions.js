import { USER_LOGIN_SUCCESS, USER_LOGOUT } from './types';

export const userLoginSuccess = userInfo => {
  return dispatch => {
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: userInfo
    });
  };
};

export const userLogout = () => {
  return dispatch => {
    dispatch({ type: USER_LOGOUT });
  };
};
