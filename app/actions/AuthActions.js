import { USER_LOGIN_SUCCESS, USER_LOGOUT } from './types';

async function loginByGoogle() {
  try {
    const result = await Expo.Google.logInAsync({
      iosClientId:
        '391024201222-ljp9geta9e1mj4m14sg2bimh04phbn0c.apps.googleusercontent.com',
      androidClientId:
        '391024201222-8k77d0m8fb5tatknsqbgbok2esmtco9u.apps.googleusercontent.com',
      scopes: ['profile', 'email']
    });

    if (result.type === 'success') {
      console.log('login success', result);
      setCurrentUser({
        accessToken: result.accessToken,
        fullName: result.user.name,
        email: result.user.email,
        photoUrl: result.user.photoUrl
      });
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}

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
