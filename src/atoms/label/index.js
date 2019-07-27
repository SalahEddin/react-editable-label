import React, { useState } from 'react';
import PropTypes from 'prop-types';
import edit_icon from './images/edit_icon.png'; // relative path to image
import './index.css';

const TAB_KEY_CODE = 9;
const ENTER_KEY_CODE = 13;
const ESCAPE_KEY_CODE = 27;

function EditableLabel(props) {
  EditableLabel.propTypes = {
    text: PropTypes.string.isRequired,
    isEditing: PropTypes.bool,

    labelClassName: PropTypes.string,
    labelFontSize: PropTypes.string,
    labelFontWeight: PropTypes.string,

    inputMaxLength: PropTypes.number,
    inputPlaceHolder: PropTypes.string,
    inputTabIndex: PropTypes.number,
    inputWidth: PropTypes.string,
    inputFontSize: PropTypes.string,
    inputFontWeight: PropTypes.string,
    inputClassName: PropTypes.string,
    inputBorderWidth: PropTypes.string,

    onFocus: PropTypes.func,
    onFocusOut: PropTypes.func,
    raiseOnFocusOutOnEsc: PropTypes.bool
  };

  EditableLabel.defaultProps = {
    raiseOnFocusOutOnEsc: false
  };

  const [state, setState] = useState({
    isEditing: props.isEditing || false,
    prevText: props.text || '',
    editIconVisibility: 'collapse'
  });
  const [text, setText] = useState(props.text || '');

  function handleFocus(escaped = false) {
    if (state.isEditing) {
      if (typeof props.onFocusOut !== 'function') return;

      if (escaped) {
        // rest the text state and
        setText(state.prevText);
        if (props.raiseOnFocusOutOnEsc) {
          props.onFocusOut(text);
        }
      } else {
        setState({
          ...state,
          prevText: text
        });
        props.onFocusOut(text);
      }
    } else {
      if (typeof props.onFocus !== 'function') return;
      props.onFocus(text);
    }
    onLabelMouseOut();
    setState({
      ...state,
      isEditing: !state.isEditing
    });
  }

  function handleChange(event) {
    setText(event.target.value);
  }

  function onLabelMouseOver() {
    setState({
      ...state,
      editIconVisibility: 'visible',
      labelBackgroundColor: 'grey',
      boxShadowStyle: '1px 1px 10px #333'
    });
  }

  function onLabelMouseOut() {
    setState({
      ...state,
      editIconVisibility: 'collapse',
      labelBackgroundColor: 'transparent',
      boxShadowStyle: 'None'
    });
  }

  function handleKeyDown(e) {
    if (e.keyCode === ENTER_KEY_CODE || e.keyCode === TAB_KEY_CODE) {
      handleFocus();
    } else if (e.keyCode === ESCAPE_KEY_CODE) {
      handleFocus(true);
    }
  }

  return state.isEditing ? (
    <input
      type="text"
      className={props.inputClassName}
      value={text}
      onChange={event => handleChange(event)}
      onBlur={() => handleFocus()}
      onKeyDown={e => handleKeyDown(e)}
      style={{
        width: props.inputWidth,
        fontSize: props.inputFontSize,
        fontWeight: props.inputFontWeight,
        borderWidth: props.inputBorderWidth
      }}
      maxLength={props.inputMaxLength}
      placeholder={props.inputPlaceHolder}
      tabIndex={props.inputTabIndex}
      autoFocus
    />
  ) : (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: state.labelBackgroundColor,
          fontSize: props.labelFontSize,
          fontWeight: props.labelFontWeight,
          borderRadius: '5px',
          boxShadow: state.boxShadowStyle,
          width: '100%'
      }}
    >
      <span
        className={props.labelClassName}
        onMouseOver={() => onLabelMouseOver()}
        onMouseLeave={() => onLabelMouseOut()}
        onClick={() => handleFocus()}
        onKeyDown={e => handleKeyDown(e)}
      >
        {text}
      </span>
      <div style={{ width: '100%', height: '100%' }}>
      <img
        src={edit_icon}
        alt="edit"
        width="100%"
        height="100%"
        style={{
          backgroundColor: 'grey',
          visibility: state.editIconVisibility
        }}
      />
      </div>
    </div>
  );
}

export default EditableLabel;
