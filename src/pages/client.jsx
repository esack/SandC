import React from 'react';
import PropTypes  from 'prop-types';

const Client = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
}

Client.propTypes = {
   children: PropTypes.object.isRequired
}

export default Client;