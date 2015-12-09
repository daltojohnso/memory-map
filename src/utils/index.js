import React        from 'react';
import ReactDOM     from 'react-dom';
import { Provider } from 'react-redux';
import DevTools     from 'containers/DevToolsWindow';

export function createConstants (...constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});
}

export function createReducer (initialState, fnMap) {
  return (state = initialState, { type, payload }) => {
    const handler = fnMap[type];

    return handler ? handler(state, payload) : state;
  };
}

export function createDevToolsWindow (store) {
  const win = window.open(
    null,
    'redux-devtools', // give it a name so it reuses the same window
    `width=400,height=${window.outerHeight},menubar=no,location=no,resizable=yes,scrollbars=no,status=no`
  );

  // reload in case it's reusing the same window with the old content
  win.location.reload();

  // wait a little bit for it to reload, then render
  setTimeout(() => {
    // Wait for the reload to prevent:
    // "Uncaught Error: Invariant Violation: _registerComponent(...): Target container is not a DOM element."
    win.document.write('<div id="react-devtools-root"></div>');
    win.document.body.style.margin = '0';

    ReactDOM.render(
      <Provider store={store}>
        <DevTools />
      </Provider>
      , win.document.getElementById('react-devtools-root')
    );
  }, 10);
}

export function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export function getSelectionText() {
  var text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  return text;
}

export function getInputSelection(el) {
  var start = 0, end = 0, normalizedValue, range,
    textInputRange, len, endRange;

  if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
    start = el.selectionStart;
    end = el.selectionEnd;
  } else {
    range = document.selection.createRange();

    if (range && range.parentElement() == el) {
      len = el.value.length;
      normalizedValue = el.value.replace(/\r\n/g, "\n");

      // Create a working TextRange that lives only in the input
      textInputRange = el.createTextRange();
      textInputRange.moveToBookmark(range.getBookmark());

      // Check if the start and end of the selection are at the very end
      // of the input, since moveStart/moveEnd doesn't return what we want
      // in those cases
      endRange = el.createTextRange();
      endRange.collapse(false);

      if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
        start = end = len;
      } else {
        start = -textInputRange.moveStart("character", -len);
        start += normalizedValue.slice(0, start).split("\n").length - 1;

        if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
          end = len;
        } else {
          end = -textInputRange.moveEnd("character", -len);
          end += normalizedValue.slice(0, end).split("\n").length - 1;
        }
      }
    }
  }

  return {
    start: start,
    end: end
  };
}

export function moveCaret(win, charCount) {
  var sel, range;
  if (win.getSelection) {
    sel = win.getSelection();
    if (sel.rangeCount > 0) {
      var textNode = sel.focusNode;
      var newOffset = sel.focusOffset + charCount;
      sel.collapse(textNode, Math.min(textNode.length, newOffset));
    }
  } else if ( (sel = win.document.selection) ) {
    if (sel.type != "Control") {
      range = sel.createRange();
      range.move("character", charCount);
      range.select();
    }
  }
}

export function getUser() {
  if (isLocalStorageNameSupported()) {
    let id = window.localStorage.getItem('id');
    let user = window.localStorage.getItem('user');
    return {id, user};
  }
  return false;
}

export function setUser(data) {
  if (isLocalStorageNameSupported()) {
    window.localStorage.setItem('id', data.id);
    window.localStorage.setItem('user', data.user);
    return true;
  }
  return false;
}

function isLocalStorageNameSupported() {
  var testKey = 'test', storage = window.localStorage;
  try {
    storage.setItem(testKey, '1');
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}
