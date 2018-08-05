import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Checkbox } from 'react-icheck';
import { login, passwordReset, setAuthUserAfterlogin } from '../actions/user-actions';

class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            remember_me: false,
            login_error: "",
            show_password_remember: false,
            show_password_remember_message: false
        }

        this.showPasswordRemember = this.showPasswordRemember.bind(this);
        this.showLogin = this.showLogin.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ login_error: "" })

        if (e.target.name === "email" || e.target.name === "password") {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
        else {
            this.setState({
                [e.target.name]: e.target.checked
            });
        }
    }

    onSubmit(event) {
        event.preventDefault();

        $("button").html("Signing In...").prop('disabled', true);

        this.props.login(this.state.email, this.state.password).then(response => {
            this.props.setAuthUserAfterlogin(this.state.email, response, this.state.remember_me).then(response =>
            {
                
            }).catch(response => {
                $("button").html("Sign In").prop('disabled', false);
                this.setState({ login_error: "We are having issues login you in please try again later." })
            });
    }).catch(response => {
            $("button").html("Sign In").prop('disabled', false);
        this.setState({ login_error: "Please check your email or password." })
        });
}

onReset(event) {
    event.preventDefault();
    this.props.passwordReset(this.state.email).then(response => {
        this.setState({ show_password_remember_message: true });
    }).catch(response => {
        this.setState({ show_password_remember_message: true });
    });
}

showPasswordRemember(event) {
    event.preventDefault();
    this.setState({ show_password_remember: true });
}

showLogin() {
    this.setState({
        show_password_remember: false,
        show_password_remember_message: false
    });
}

render() {
    if (this.state.show_password_remember === false) {
        return (
            <div className="login-box">
                <div className="login-logo">
                    S & C
                    </div>
                <div className="login-box-body">
                    <p className="login-box-msg">Welcone to S & C</p>
                    <form role="form" onSubmit={this.onSubmit}>
                        <div className="form-group has-feedback">
                            <input type="email" name="email" onChange={this.onChange} className="form-control" placeholder="Email" />
                            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="password" name="password" onChange={this.onChange} className="form-control" placeholder="Password" />
                            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                        </div>
                        <div className="row">
                            <div className="col-xs-8">
                            </div>
                            <div className="col-xs-4">
                                <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                {this.state.login_error}
                            </div>
                        </div>
                    </form>
                    <a href="#" onClick={this.showPasswordRemember}>I forgot my password</a><br />
                </div>
            </div>
        );
    }
    else {
        if (this.state.show_password_remember_message === false) {
            return (
                <div className="login-box">
                    <div className="login-logo">
                        S & C
                        </div>
                    <div className="login-box-body">
                        <p className="login-box-msg">Enter your email to reset your password.</p>
                        <form role="form" onSubmit={this.onReset}>
                            <div className="form-group has-feedback">
                                <input type="email" name="email" onChange={this.onChange} className="form-control" placeholder="Email" />
                                <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                            </div>
                            <div className="row">
                                <div className="col-xs-8">
                                </div>
                                <div className="col-xs-4">
                                    <button type="submit" className="btn btn-primary btn-block btn-flat">Reset</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="login-box">
                    <div className="login-logo">
                        S & C
                        </div>
                    <div className="login-box-body">
                        <p>An email with rest details was sent to the<br />email entered
                    <br /><br />Please follow the instructions and try to login again</p>
                        <button onClick={this.showLogin} className="btn btn-primary btn-block btn-flat">Close</button>
                    </div>
                </div>
            );
        }
    }
}
}

export default connect(null, { login, passwordReset, setAuthUserAfterlogin })(Login);