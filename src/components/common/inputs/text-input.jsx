import React from 'react';
import PropTypes from 'prop-types';

class TextInput extends React.Component {
  render() {
    return (
      <div className="form-group">
        <input className={this.props.className !== "" ? "form-control " + this.props.className : "form-control"}
          disabled={this.props.disabled != undefined && this.props.disabled ? "disabled" : ""} placeholder={this.props.placeholder}
          onChange={this.props.onChange} onFocus={this.props.onFocus} onBlur={this.props.onBlur} required={this.props.required}
          name={this.props.name} value={this.props.value} style={this.props.style} ref="myInput" type={this.props.type} />
      </div>
    )
  }
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  style: PropTypes.object,
  required: PropTypes.bool,
  type: PropTypes.string
}

export default TextInput;