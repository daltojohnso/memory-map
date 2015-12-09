import { createReducer }     from '../utils';
import * as CONSTANTS  from 'constants/meta';

const initialState = {
  loaded: false,
  loadingFailed: false,
  updating: {},
  updateFailed: {}
};
export default createReducer(initialState, {
  [CONSTANTS.LOADING_NOTES]: (state, action) => {
    return {
      state,
      loading: true
    }
  },
  [CONSTANTS.LOADED_NOTES]: (state, action) => {
    return {
      state,
      loaded: true,
      loading: false
    }
  },
  [CONSTANTS.LOAD_FAILED]: (state) => {
    return {
      state,
      loaded: false,
      loading: false,
      loadingFailed: true
    }
  }
});
