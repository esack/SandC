import React from 'react';
import PropTypes  from 'prop-types';

const File = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
}

File.propTypes = {
   children: PropTypes.object.isRequired
}

export default File;