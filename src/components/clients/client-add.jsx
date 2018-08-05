import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAppTitle, setAppDescrition } from '../../actions/app-actions';
import { setClientReset } from '../../actions/client-actions';
import ClientEdit from './client-edit'

class ClientAdd extends React.Component {

    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.props.setClientReset();
        this.props.setAppTitle("S & C");
        this.props.setAppDescrition("Add new Clinet");
    }

    render() {
        return (
            <ClientEdit projectID={this.props.params.id} />
        );
    }
}

ClientAdd.propTypes = {
    setClientReset: PropTypes.func.isRequired,
    setAppTitle: PropTypes.func.isRequired,
    setAppDescrition: PropTypes.func.isRequired
}

export default connect(null, { setClientReset, setAppTitle, setAppDescrition })(ClientAdd);
