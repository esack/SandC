import React from 'react';
import PropTypes from 'prop-types';
import LinkBox from '../common/links/link-box';
import { connect } from 'react-redux';
import { setAppTitle, setAppDescrition } from '../../actions/app-actions';

class DashboardView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.setAppTitle("Welcome to S & C");
        this.props.setAppDescrition("");
    }

    render() {

        return (
            <div>
                <LinkBox name="S & C Projects" description="Click to view all the projects"
                    link="/projects" icon="fa-building" />
                {this.props.authUserReducer.role == "ADMIN" ? <LinkBox name="S & C Admin" description="Click to manage users"
                    link="/admin" icon="fa-user" /> : null }
            </div>
        );
    }
};

DashboardView.propTypes = {
    authUserReducer: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        authUserReducer: state.authUserReducer
    };
}

export default connect(mapStateToProps, { setAppTitle, setAppDescrition })(DashboardView);

