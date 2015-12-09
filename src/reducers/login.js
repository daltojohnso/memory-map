import { createReducer, getUser }     from '../utils';
import * as CONSTANTS  from 'constants/login';

let user = getUser() || {};

const initialState = {
  user: user,
  loggingIn: false,
  loggedIn: !!user && !!user.id,
  loginFailed: false
}

export default createReducer(initialState, {
  [CONSTANTS.LOGIN_SUCCESS]: (state, action) => {
    return {
      user: {
        user: action.user,
        id: action.id
      },
      loggedIn: true,
      loginFailed: false,
      logginIn: false
    };
  },
  [CONSTANTS.LOGGING_IN]: (state, action) => {
    return {
      state,
      loggingIn: true
    }
  },
  [CONSTANTS.LOGIN_FAILED]: (state, action) => {
    return {
      state,
      loggingIn: false,
      loginFailed: true
    }
  },
  [CONSTANTS.LOGGING_OUT]: (state) => {
    return {
      state
    };
  },
  [CONSTANTS.LOGOUT_SUCCESS]: (state) => {
    return {
      state,
      user: {},
      loggedIn: false
    }
  }
});
