import React from 'react';
import PropTypes  from 'prop-types';

const ErrorBox = ({title, onClose, description, errorMessage}) => {
    return (
        <div className="callout callout-danger lead">
            <h4>{title}</h4>

            <p>{description}</p>
            <p>{errorMessage}</p>
            <div onClick={onClose} style={{width: '100px'}} className="btn btn-block btn-warning">Close</div>
        </div>
    );
};

ErrorBox.propTypes = {
   title: PropTypes.string.isRequired,
   description: PropTypes.string.isRequired,
   errorMessage: PropTypes.string,
   onClose: PropTypes.func.isRequired
}

export default ErrorBox;

