import { combineReducers }    from 'redux';
import { routeReducer }       from 'redux-simple-router';
import notes             from './notes';
import meta             from './meta';
import login from './login';

export default combineReducers({
  notes,
  meta,
  login,
  routing: routeReducer
});
