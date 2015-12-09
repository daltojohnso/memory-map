import { createReducer, getUser }     from '../utils';
import * as CONSTANTS  from 'constants/login';

const initialState = getUser();

export default createReducer(initialState, {
  [CONSTANTS.LOGIN_SUCCESS]: (state, action) => {
    return {
      user: action.user,
      id: action.id
    }
  },
  [CONSTANTS.LOGIN_FAILED]: (state, action) => {
    return {
      user: false
    }
  }
});
