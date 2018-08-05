import React from 'react';
import PropTypes  from 'prop-types';

const Project = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
}

Project.propTypes = {
   children: PropTypes.object.isRequired
}

export default Project;