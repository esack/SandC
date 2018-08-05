import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUsers } from '../../actions/user-actions';
import { setAppTitle, setAppDescrition } from '../../actions/app-actions';
import LinkBoxes from '../common/links/link-boxes.jsx';

class AdminView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users_loading: true
        };
    }

    componentDidMount() {
        this.props.setAppTitle("S & C Admin");
        this.props.setAppDescrition("");
        this.props.loadUsers().then(r => {
            this.setState({ users_loading: false });
        });;
    }

    render() {
        return (
            <div>
                <LinkBoxes title="Users" link='/admin/users/add' linkTitle="Add an admin user"
                    noBoxLinksMessage="No users found" boxLinks={this.props.users} loadnig={this.state.users_loading} />
            </div>
        )
    };
}

AdminView.propTypes = {
    users: PropTypes.array.isRequired,
    setAppTitle: PropTypes.func.isRequired,
    setAppDescrition: PropTypes.func.isRequired,
    loadUsers: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const userBoxLinks = [];

    state.usersReducer.forEach(function (user) {
        userBoxLinks.push({
            name: user.name,
            link: '/admin/users/view/' + user.user_id,
            icon: "fa-user"
        });
    });

    return {
        users: userBoxLinks
    };
}

export default connect(mapStateToProps, { setAppTitle, setAppDescrition, loadUsers })(AdminView);