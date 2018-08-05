import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './text-input.jsx';

class TextInputTitle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showRequired: false,
      validationText: ""
    }

    this.onBlur = this.onBlur.bind(this);
  };

  onBlur() {
    var reEmail = /\S+@\S+\.\S+/;

    if (this.props.required && this.props.value === "") {
      this.setState({
        showRequired: true,
        validationText: this.props.requiredText != undefined && this.props.requiredText !== "" ? " " + this.props.requiredText : " Required"
      });
    } else if (this.props.type === "email" && reEmail.test(this.props.value) === false) {
      this.setState({
        showRequired: true,
        validationText: " Not a valid email"
      });
    }
    else {
      this.setState({ showRequired: false });
    }
  }

  render() {
    return (
      <div className={
        (this.state.showRequired ? "form-group has-error" : "form-group") + (this.props.iconClass != undefined ? " has-feedback" : "")}>
        {this.props.label && <label htmlFor={this.props.name}>{this.props.label}</label>}
        <TextInput placeholder={this.props.placeholder} onChange={this.props.onChange} name={this.props.name} type={this.props.type}
          value={this.props.value} style={this.props.style} required={this.props.required} onBlur={this.onBlur} />
        {this.props.iconClass != undefined ? <span className={this.props.iconClass}></span> : null}
        {this.state.showRequired ?
          <label className="control-label" htmlFor="inputError"><i className="fa fa-times-circle-o"></i>{this.state.validationText}</label> : null}
      </div>
    )
  }
}


TextInputTitle.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  requiredText: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  iconClass: PropTypes.string
}

export default TextInputTitle;