import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAppTitle, setAppDescrition } from '../../actions/app-actions';
import { setFileContainerReset } from '../../actions/file-actions';
import FileContainerEdit from './file-container-edit';

class FileContainerAdd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projectID: this.props.route.id === "ADD_PROJECT" ? this.props.params.id : undefined,
            userID: this.props.route.id === "ADD_CLIENT" ? this.props.params.id : undefined
        };
    }

    componentDidMount() {
        this.props.setFileContainerReset();
        this.props.setAppTitle("S & C");
        this.props.setAppDescrition("Add new file");
    }

    render() {
        return (
            <FileContainerEdit projectID={this.state.projectID} userID={this.state.userID} />
        );
    }
}

FileContainerAdd.propTypes = {
    setFileContainerReset: PropTypes.func.isRequired,
    setAppTitle: PropTypes.func.isRequired,
    setAppDescrition: PropTypes.func.isRequired
}

export default connect(null, {
    setFileContainerReset,
    setAppTitle,
    setAppDescrition
})(FileContainerAdd);
