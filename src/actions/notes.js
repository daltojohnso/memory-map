import * as CONSTANTS from 'constants/notes';
import * as meta from 'constants/meta';
import { getUser } from '../utils';

export default {
  create: (payload) => ({ payload, type : CONSTANTS.CREATE_NOTE }),
  toggle: (payload) => ({ payload, type: CONSTANTS.TOGGLE_NOTE }),
  edit: (payload) => ({ payload, type: CONSTANTS.EDIT_NOTE}),
  load: (payload) => ({ payload, type: CONSTANTS.LOAD_NOTES}),
  update: (payload) => {
    return (dispatch, getState) => {
      let notes = getState().notes;
      let position = notes[payload.index].position;
      let user = getUser();
      dispatch({type: meta.SAVING_NOTE});
      $.post('/api/map', {user: user, id: payload.id, content: payload.content, position: position}, function(data, success) {
        if (success === 'success') {
          dispatch({type: meta.SAVED_NOTE});
        } else {
          dispatch({type: meta.SAVE_FAILED});
        }
      });
      dispatch({ payload, type: CONSTANTS.UPDATE_NOTE});
    }
  }
};
