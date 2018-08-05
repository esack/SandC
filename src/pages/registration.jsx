import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { register } from '../actions/user-actions';
import SuccessfulBox from '../components/common/successful-box';
import ErrorBox from '../components/common/error-box'
import Password from '../components/common/password'

class Registration extends React.Component {
    constructor() {
        super();

        this.state = {
            registration_successful: false,
            error: ""
        }

        $("body").addClass("login-page");

        this.onSubmit = this.onSubmit.bind(this);
        this.closeErrorBox = this.closeErrorBox.bind(this);
    }

    onSubmit(password, confirm_password) {
        var auth_user = {
            password: password,
            confirm_password: confirm_password,
            identity_code: this.props.params.identity_code
        }

        this.props.register(auth_user).then(response => {
            this.setState({ registration_successful: true })
        }).catch(response => {
            response.json().then(error => {
                this.setState({ error: error.Message });
            });
        });
    }

    closeErrorBox() {
        this.setState({ error: "" })
    }

    render() {
        return (
            <div className="login-box">
                {this.state.registration_successful === false && this.state.error === "" ?
                    <div>
                        <div className="login-logo">
                            S & C Compleate Registration
                        </div>
                        <div className="login-box-body">
                            <p className="login-box-msg">Compleate your registration here</p>
                            <Password onSubmit={this.onSubmit} />
                        </div>
                    </div> : null
                }
                {this.state.registration_successful ?
                    <SuccessfulBox title="Compleate Registration" link="/"
                        description="Registration completed succsesfully. Please continue to the login screen." /> : null
                }
                {this.state.error !== "" ?
                    <ErrorBox title="Compleate Registration Error" description="You had an error while compleate registration pelase try again."
                        errorMessage={this.state.error} onClose={this.closeErrorBox} /> : null}
            </div>
        );
    }
}

export default connect(null, { register })(Registration);