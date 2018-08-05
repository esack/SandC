import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSupplier, updateSupplier } from '../../actions/supplier-actions';
import { setAppDescrition, setAppTitle } from '../../actions/app-actions';
import Form from '../common/form/form'

class SupplierEdit extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showSuccessBox: false
        }

        this.isEdit = this.isEdit.bind(this);
        this.saveSupplier = this.saveSupplier.bind(this);
    };

    isEdit() {
        return this.props.supplier_data.supplier_id > 0
    }

    saveSupplier(event) {
        event.preventDefault();

        if (this.props.supplier_data.supplier_id === 0) {
            this.props.createSupplier(this.props.supplier_data).then(response => {
                this.setState({ showSuccessBox: true });
            });
        }
        else {
            this.props.updateSupplier(this.props.supplier_data.supplier_id, this.props.supplier_data).then(response => {
                this.setState({ showSuccessBox: true });
            });;
        }
    }

    render() {
        return (
            <Form formMapping={this.props.supplierFormMapping} formData={this.props.supplier_data} onSubmit={this.saveSupplier}
                submitButtonLabel={this.isEdit() ? "Save" : "Create"} showSuccessBox={this.state.showSuccessBox}
                successTitle={this.isEdit() ? "Supplier saved successfully" : "Supplier create successfully"}
                successDescription={this.isEdit() ? "The Supplier was saved successfully" : "The Supplier was created successfully"}
                successLink={this.props.projectID != undefined ? "/projects/" + this.props.projectID : null} successOnClick={this.props.successOnClick}
                errorTitle="Something went wrong" formTitle="Enter Supplier details" isUpdate={this.isEdit()}
                errorDescription={"Something went wrong while " + (this.isEdit() ? " saving your changes" : "creating your Supplier")}
                cancelLink={this.props.projectID != undefined ? "/projects/" + this.props.projectID : null} cancelOnClick={this.props.cancelOnClick} />
        );
    }
}

SupplierEdit.propTypes = {
    projectID: PropTypes.string,
    supplier_data: PropTypes.object.isRequired,
    supplierFormMapping: PropTypes.array.isRequired,
    createSupplier: PropTypes.func.isRequired,
    updateSupplier: PropTypes.func.isRequired,
    setAppDescrition: PropTypes.func.isRequired,
    setAppTitle: PropTypes.func.isRequired,
    successOnClick: PropTypes.func,
    cancelOnClick: PropTypes.func
}

function mapStateToProps(state, ownProps) {

    const supplier_data = state.supplierReducer.supplier_data;

    if (ownProps.projectID != undefined) {
        supplier_data.project_id = ownProps.projectID;
    }

    return {
        supplier_data: supplier_data,
        supplierFormMapping: state.supplierFormMappingReducer
    };
}

export default connect(mapStateToProps, { createSupplier, updateSupplier, setAppDescrition, setAppTitle })(SupplierEdit);
