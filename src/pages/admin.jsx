import React from 'react';
import PropTypes  from 'prop-types';

const Admin = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
}

Admin.propTypes = {
   children: PropTypes.object.isRequired
}

export default Admin;