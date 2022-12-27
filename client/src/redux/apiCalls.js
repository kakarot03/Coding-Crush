import {
  googleLogin,
  loginFailure,
  loginStart,
  loginSuccess,
  logOut,
  registerFailure,
  registerStart,
  registerSuccess,
} from './userRedux';
import authRoute from '../routes/authRoute';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await authRoute.post('/login', user);
    return dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
    return err.response.data;
  }
};

const titleCase = (str) => {
  str = str
    .split(' ')
    .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(' ');
  return str;
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const name = user.username;
    user = { ...user, username: titleCase(name) };
    const res = await authRoute.post('/register', user);
    return dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
    return err.response.data;
  }
};

export const googleRegister = async (dispatch, googleUser) => {
  dispatch(registerStart());
  try {
    let user = {
      username: titleCase(
        googleUser.name.substring(0, googleUser.name.indexOf(' '))
      ),
      registerEmail: googleUser.email,
      registerPassword: googleUser.sub,
    };
    const res = await authRoute.post('/googleRegister', user);
    return dispatch(googleLogin(res.data));
  } catch (err) {
    dispatch(registerFailure());
    return err.response.data;
  }
};

export const logout = (dispatch) => {
  dispatch(logOut());
};
