import React from "react";
import PropTypes from "prop-types";
import edit_icon from "./images/edit_icon.png"; // relative path to image
import "./index.css";

const TAB_KEY_CODE = 9;
const ENTER_KEY_CODE = 13;
const ESCAPE_KEY_CODE = 27;

export default class EditableLabel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: this.props.isEditing || false,
      text: this.props.text || "",
      prevText: this.props.text || "",
      editIconVisibility: "collapse"
    };

    this._handleFocus = this._handleFocus.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  _handleFocus(escaped = false) {
    if (this.state.isEditing) {
      if (typeof this.props.onFocusOut === "function") {
        if (escaped) {
          // rest the text state and
          this.setState({
            text: this.state.prevText
          });
          if (this.props.raiseOnFocusOutOnEsc) {
            this.props.onFocusOut(this.state.text);
          }
        } else {
          this.setState({
            prevText: this.state.text
          });
          this.props.onFocusOut(this.state.text);
        }
      }
    } else {
      if (typeof this.props.onFocus === "function") {
        this.props.onFocus(this.state.text);
      }
    }
    this._onLabelMouseOut();
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  _handleChange() {
    this.setState({
      text: this.textInput.value
    });
  }

  _onLabelMouseOver() {
    this.setState({
      editIconVisibility: "visible",
      labelBackgroundColor: "grey",
      boxShadowStyle: "1px 1px 10px #333"
    });
  }

  _onLabelMouseOut() {
    this.setState({
      editIconVisibility: "collapse",
      labelBackgroundColor: "transparent",
      boxShadowStyle: "None"
    });
  }

  _handleEnterKey() {
    this._handleFocus();
  }

  _handleEscapeKey() {
    this._handleFocus(true);
  }

  _handleKeyDown(e) {
    if (e.keyCode === ENTER_KEY_CODE || e.keyCode === TAB_KEY_CODE) {
      this._handleEnterKey();
    } else if (e.keyCode === ESCAPE_KEY_CODE) {
      this._handleEscapeKey();
    }
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div>
          <input
            type="text"
            className={this.props.inputClassName}
            ref={input => {
              this.textInput = input;
            }}
            value={this.state.text}
            onChange={this._handleChange}
            onBlur={this._handleFocus}
            onKeyDown={this._handleKeyDown}
            style={{
              width: this.props.inputWidth,
              fontSize: this.props.inputFontSize,
              fontWeight: this.props.inputFontWeight,
              borderWidth: this.props.inputBorderWidth
            }}
            maxLength={this.props.inputMaxLength}
            placeholder={this.props.inputPlaceHolder}
            tabIndex={this.props.inputTabIndex}
            autoFocus
          />
        </div>
      );
    }

    return (
      <div>
        <label
          className={this.props.labelClassName}
          onMouseOver={() => this._onLabelMouseOver()}
          onMouseLeave={() => this._onLabelMouseOut()}
          onClick={this._handleFocus}
          onKeyDown={this._handleKeyDown}
          style={{
            backgroundColor: this.state.labelBackgroundColor,
            fontSize: this.props.labelFontSize,
            fontWeight: this.props.labelFontWeight,
            borderRadius: "5px",
            boxShadow: this.state.boxShadowStyle,
            width: "auto",
            display: "block"
          }}
        >
          {this.state.text}
          <span>
            <img
              src={edit_icon}
              alt="edit"
              display="inline-block"
              width="20px"
              style={{
                marginLeft: "10px",
                backgroundColor: "grey",
                visibility: this.state.editIconVisibility
              }}
            />
          </span>
        </label>
      </div>
    );
  }
}

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
