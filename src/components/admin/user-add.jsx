import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAppTitle, setAppDescrition } from '../../actions/app-actions';
import { setUserReset } from '../../actions/user-actions';
import UserEdit from './user-edit'

class UserAdd extends React.Component {

    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.props.setUserReset();
        this.props.setAppTitle("S & C");
        this.props.setAppDescrition("Add new user");
    }

    render() {
        return (
            <UserEdit />
        );
    }
}

UserAdd.propTypes = {
    setUserReset: PropTypes.func.isRequired,
    setAppTitle: PropTypes.func.isRequired,
    setAppDescrition: PropTypes.func.isRequired
}

export default connect(null, { setUserReset, setAppTitle, setAppDescrition })(UserAdd);
