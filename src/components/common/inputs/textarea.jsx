import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({ label, placeholder, onChange, value, name }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor="description">{label}</label>}
      <textarea className="form-control" placeholder={placeholder} onChange={onChange} name={name} value={value} />
    </div>
  )
}

Textarea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default Textarea;