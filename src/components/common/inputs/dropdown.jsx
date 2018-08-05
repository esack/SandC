import React from 'react';
import PropTypes from 'prop-types';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showRequired: false
    };

    this.onBlur = this.onBlur.bind(this);
  }

  onBlur() {
    if (this.props.required && this.props.value === '') {
      this.setState({ showRequired: true });
    } else {
      this.setState({ showRequired: false });
    }
  }

  render() {
    return (
      <div className={this.state.showRequired ? 'form-group has-error' : 'form-group'}>
        {this.props.label != undefined ? <label htmlFor={this.props.name}>{this.props.label}</label> : null}
        <select className="form-control" onChange={this.props.onChange} onBlur={this.onBlur} name={this.props.onChange}
          value={this.props.value != null && this.props.value != undefined ? this.props.value : ""} required={this.props.required}>
          <option value="">Select</option>
          {this.props.options.map((option, i) => <option key={i} value={option.value}>{option.text}</option>)}
        </select>
        {this.state.showRequired ?
          <label className="control-label" htmlFor="inputError"><i className="fa fa-times-circle-o"></i>
            {this.props.requiredText != undefined && this.props.requiredText !== '' ? ' ' + this.props.requiredText : ' Required'}</label> : null}

      </div>
    )
  };
}


Dropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  requiredText: PropTypes.string
}


export default Dropdown;