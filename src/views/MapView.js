import React                  from 'react';
import {GoogleMap, Marker, InfoWindow}    from "react-google-maps";
import {Button} from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import notesActions         from 'actions/notes';
import metaActions         from 'actions/meta';
import { debounce, getSelectionText, getInputSelection, moveCaret} from '../utils'

const mapStateToProps = (state) => ({
  notes : state.notes,
  meta: state.meta,
  routerState : state.router
});
const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(Object.assign({}, notesActions, metaActions), dispatch)
});
export class Map extends React.Component {
  constructor() {
    super();
    this.state = this.state || {}
    this.state.height = 0;
  }

  static propTypes = {
    actions  : React.PropTypes.object,
    notes: React.PropTypes.array
  }

  componentDidMount() {
    this.props.actions.getNotes();
    let me = this;
    let resize = this.resize(me);
    window.addEventListener('resize', function() {
      resize();
    });

  }

  resize(scope) {
    let resizeTimer;
    return function() {
      window.clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        scope.setState({height: window.innerHeight - 70});
      }, 300)
    };
  }



  componentDidUpdate() {
    window.setTimeout(function(scope) {
      const inputs = document.getElementsByTagName('textarea');
      if (inputs[0]) {
        inputs[0].addEventListener('keydown', scope._handleKeyDown.bind(scope, inputs[0], {data: ''}));
        inputs[0].focus();
      }
    }, 50, this);
  }

  render() {

    const notes = this.props.notes;
    const lastIndex = notes.length - 1;
    let height = this.state.height || (window.innerHeight - 70) + 'px';
    return (
        <GoogleMap containerProps={{className:'gab-map', style: {height: height, width: '100%'}}}
          onClick={this._newNote.bind(this, lastIndex)}
          defaultZoom={18}
          defaultCenter={{lat: 40.755220, lng: -73.916184}} >
              {notes.map((marker, index) => {
                const ref = `${index}_marker`;
                return (
                  <Marker key={index} ref={ref}
                    position={marker.position}
                    title={marker.content}
                    onClick={this._markerClick.bind(this, index)}>
                    {marker.showInfo ? this._renderInfoWindow(ref, marker, index) : null}
                  </Marker>
                )
              })}
        </GoogleMap>
    );
  }

  _handleKeyDown(input, clipboard, e) {
    //TODO paste doesn't work correctly..., needs some cleaning up.
    const ENTER = 13,
      A = 65,
      C = 67,
      V = 86,
      X = 88;
    if (e.keyCode === ENTER) {
      const index = input.dataset.index;
      this._updateNote(index, input.dataset.id);
    } else if (e.keyCode === A && e.ctrlKey) {
      e.target.select()
    } else if (e.keyCode === C && e.ctrlKey) {
      clipboard.data = getSelectionText();
    } else if (e.keyCode === V && e.ctrlKey) {
      let text = input.value;
      text = text.slice(0, input.selectionStart) + text.slice(input.selectionEnd);
      input.value = text;
      text = input.value;
      let caret = getInputSelection(input).start;
      input.value = text.slice(0, caret) + clipboard.data + text.slice(caret+1);
    } else if (e.keyCode === X && e.ctrlKey) {
      clipboard.data = getSelectionText();
    }
    return true;
  }

  _newNote(lastIndex, event) {
    this.props.actions.create({lat: event.latLng.lat(), lng: event.latLng.lng()});
  }

  _markerClick(index) {
    this.props.actions.toggle({index: index, showInfo: true});

  }

  _closeClick(index) {
    this.props.actions.toggle({index: index, showInfo: false});
  }

  _updateNote(index, id) {
    index = +index;
    this.props.actions.update({content: this.refs[`${index}_input`].value, id, index});
  }

  _editNote(index) {
    this.props.actions.edit({index});
  }

  _renderInfoWindow(ref, marker, index) {
    let content = marker.content,
      editMode = marker.editMode,
      note = editMode ?
        (<textarea className='gab-input'
          ref={`${index}_input`}
          data-index={index}
          data-id={marker.id}
          onBlur={this._updateNote.bind(this, index, marker.id)}
          defaultValue={content} />) :
        (<div className='gab-textarea' onClick={this._editNote.bind(this, index)} >{content}</div>);
    return (
      <InfoWindow key={`${ref}_info_window`}
        onCloseclick={this._closeClick.bind(this, index)}>
      {note}
      </InfoWindow>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
