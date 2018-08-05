import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAppTitle, setAppDescrition } from '../../actions/app-actions';
import { setContactReset } from '../../actions/supplier-actions';
import ContactEdit from './supplier-contact-edit'

class ContactAdd extends React.Component {

    constructor(props) {
        super(props);
    };

    componentWillMount() {
        this.props.setContactReset();
        this.props.setAppTitle("S & C");
        this.props.setAppDescrition("");
    }

    render() {
        return (
            <ContactEdit supplierID={this.props.params.id} />
        );
    }
}

ContactAdd.propTypes = {
    setContactReset: PropTypes.func.isRequired,
    setAppTitle: PropTypes.func.isRequired,
    setAppDescrition: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        contact: state.contactReducer
    };
}

export default connect(mapStateToProps, { setContactReset, setAppTitle, setAppDescrition })(ContactAdd);
