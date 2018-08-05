import React from 'react';
import PropTypes from 'prop-types';
import TextInputTitle from './inputs/text-input-title';

class Password extends React.Component {
    constructor() {
        super();

        this.state = {
            password: "",
            confirm_password: "",
            do_not_match: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        
        if (this.state.password !== this.state.confirm_password) {
            this.setState({ do_not_match: true });
            return;
        }

        $("button").html("saving...").prop('disabled', true);

        this.props.onSubmit(this.state.password, this.state.confirm_password);
    }

    render() {
        return (
            <form role="form" onSubmit={this.onSubmit}>
                <TextInputTitle name="password" onChange={this.onChange} placeholder="Password" required={true} value={this.state.password}
                    requiredText="Password is required" type="password" iconClass="glyphicon glyphicon-lock form-control-feedback" />
                <TextInputTitle name="confirm_password" onChange={this.onChange} placeholder="Confirm password" required={true} value={this.state.confirm_password}
                    requiredText="Confirm password is required" type="password" iconClass="glyphicon glyphicon-lock form-control-feedback" />
                <div className="row">
                    <div className="col-xs-8">
                        {this.state.do_not_match ? <div>Passwords do not match</div> : ""}
                    </div>
                    <div className="col-xs-4">
                        <button type="submit" className="btn btn-primary btn-block btn-flat">Save</button>
                    </div>
                </div>
            </form>
        );
    }
}

Password.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default Password;