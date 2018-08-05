import React from 'react';
import PropTypes  from 'prop-types';

const Supplier = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
}

Supplier.propTypes = {
   children: PropTypes.object.isRequired
}

export default Supplier;