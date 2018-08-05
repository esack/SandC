import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAppTitle, setAppDescrition } from '../../actions/app-actions';
import { setSupplierReset } from '../../actions/supplier-actions';
import SupplierEdit from './supplier-edit'

class SupplierAdd extends React.Component {

    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.props.setSupplierReset();
        this.props.setAppTitle("S & C");
        this.props.setAppDescrition("Add new Supplier");
    }

    render() {
        return (
            <SupplierEdit projectID={this.props.params.id} />
        );
    }
}

SupplierAdd.propTypes = {
    setSupplierReset: PropTypes.func.isRequired,
    setAppTitle: PropTypes.func.isRequired,
    setAppDescrition: PropTypes.func.isRequired
}


export default connect(null, { setSupplierReset, setAppTitle, setAppDescrition })(SupplierAdd);
