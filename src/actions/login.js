import * as CONSTANTS from 'constants/login';
import {setUser} from '../utils';

export default {
  login: (payload) => {
    return (dispatch, getState) => {
      $.post('/api/login', {user: payload.user, password: payload.password}, function(data, success) {
        if (data && data.id) {
          setUser(data);
          dispatch({payload: {id: data.id, user: data.user}, type: CONSTANTS.LOGIN_SUCCESS})
        } else {
          dispatch({type: CONSTANTS.LOAD_FAILED});
        }
      });
    }
  }
};
