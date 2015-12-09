import * as metaConstants from 'constants/meta';
import * as notesConstants from 'constants/notes';
import { getUser } from '../utils';

export default {
  getNotes: (payload) => {
    return (dispatch, getState) => {
      let user = getUser();
      $.getJSON('/api/map', {user: user}, function(notes, success) {
        if (success === 'success') {
          dispatch({payload: {notes}, type: notesConstants.LOAD_NOTES});
          dispatch({type: metaConstants.LOADED_NOTES});
        } else {
          dispatch({type: metaConstants.LOAD_FAILED})
        }

      });
      dispatch( {type: metaConstants.LOADING_NOTES} );
    }
  }
};
