import React from 'react';
import PropTypes  from 'prop-types';
import { Link } from 'react-router';

const SuccessfulBox = ({title, link, description, onClick}) => {
    return (
        <div className="callout callout-info">
            <h4>{title}</h4>

            <p>{description}</p>
            {
                link != undefined ? <Link to={link} style={{width: '100px'}} className="btn  btn-block btn-success">Close</Link> :
                    onClick != undefined ? <div style={{width: '100px'}} onClick={onClick} className="btn  btn-block btn-success">Close</div> : null
            }
            
        </div>
    );
};

SuccessfulBox.propTypes = {
   title: PropTypes.string.isRequired,
   description: PropTypes.string.isRequired,
   link: PropTypes.string,
   onClick: PropTypes.func
}

export default SuccessfulBox;

