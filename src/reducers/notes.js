import { createReducer }     from '../utils';
import * as CONSTANTS from 'constants/notes';
import shortid from 'shortid';

//const initialState = [{
//    position: {lat: 40.755220, lng: -73.916184},
//    content: 'aaasdasdasdasdasdasdasd',
//    showInfo: true,
//    editMode: false
//  }
//];

const initialState = [];

export default createReducer(initialState, {
  [CONSTANTS.LOAD_NOTES]: (state, action) => {
    return [
      ...action.notes
    ];
  },
  [CONSTANTS.CREATE_NOTE]: (state, position) => {
    let last = state.length-1;
    let skip = state[last] ? state[last].content === '' ? 1 : 0 : 0;
    return [
      ...state.slice(0, state.length - skip),
        {
          position: position,
          content: '',
          showInfo: true,
          editMode: true,
          id: shortid.generate()
        }
    ];
  },
  [CONSTANTS.UPDATE_NOTE]: (state, action) => {
    if (action.content) {
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          content: action.content,
          editMode: false
        }),
        ...state.slice(action.index + 1)
      ];
    } else {

      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ]
    }

  },
  [CONSTANTS.TOGGLE_NOTE]: (state, action) => {
    return [
      ...state.slice(0, action.index),
      Object.assign({}, state[action.index], {
        showInfo: action.showInfo
      }),
      ...state.slice(action.index + 1)
    ];

  },
  [CONSTANTS.EDIT_NOTE]: (state, action) => {
    return [
      ...state.slice(0, action.index),
      Object.assign({}, state[action.index], {
        editMode: true
      }),
      ...state.slice(action.index + 1)
    ];
  }
});
