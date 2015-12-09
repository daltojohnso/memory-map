import * as CONSTANTS from 'constants/login';
import {setUser, getUser, deleteUser} from '../utils';

export default {
  login: (payload) => {
    return (dispatch, getState) => {
      $.post('/api/login', {user: payload.user, password: payload.password}, function(data, success) {
        if (data && data.id) {
          setUser(data);
          dispatch({payload: {id: data.id, user: data.user}, type: CONSTANTS.LOGIN_SUCCESS})
        } else {
          dispatch({type: CONSTANTS.LOGIN_FAILED});
        }
      });
      dispatch({type: CONSTANTS.LOGGING_IN});
    }
  },
  logout: () => {
    let user = getUser();
    return (dispatch, getState) => {
      $.post('/api/logout', {id: user.id}, function(result, success) {
        if (result) {
          deleteUser();
          dispatch({type: CONSTANTS.LOGOUT_SUCCESS})
        } else {
          //...
        }
      });
      dispatch({type: CONSTANTS.LOGGING_OUT});
    }
  }
}

;
