import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUser, updateUser, loadUser, passwordReset } from '../../actions/user-actions';
import { setAppDescrition, setAppTitle } from '../../actions/app-actions';
import Form from '../common/form/form'

class UserEdit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showSuccessBox: false,
      showPasswordResetSent: false
    }

    this.isEdit = this.isEdit.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  };

  componentDidMount() {
    if (this.props.params != undefined) {
      this.props.loadUser(this.props.params.id);
    }
  }

  isEdit() {
    return this.props.user.user_id > 0;
  }

  resetPassword() {
    this.props.passwordReset(this.props.user.email).then(response => {
      this.setState({ showPasswordResetSent: true });
    });
  }

  saveUser(event) {
    event.preventDefault();
    if (this.props.user.user_id === 0) {
      this.props.createUser(this.props.user).then(response => {
        this.setState({ showSuccessBox: true });
      });
    }
    else {
      this.props.updateUser(this.props.user.user_id, this.props.user).then(response => {
        this.setState({ showSuccessBox: true });
      });
    }
  }

  render() {
    return (
      <div>
        {this.isEdit() ?
          <div>
            <div className="btn  btn-info btn-flat pull-left" onClick={this.resetPassword} >Reset password</div>
            <br /><br />
            {this.state.showPasswordResetSent ? <div>Email with password reset instructions was sent to {this.props.user.email}<br /><br /></div> : ""}
          </div>
          : null
        }
        <div className="row">
          <div className="col-md-6">
            <Form formMapping={this.props.userFormMapping} formData={this.props.user} onSubmit={this.saveUser}
              submitButtonLabel={this.isEdit() ? "Save" : "Create"} showSuccessBox={this.state.showSuccessBox}
              successTitle={this.isEdit() ? "User saved successfully" : "User create successfully"}
              successDescription={this.isEdit() ? "The user was saved successfully" : "The user was created successfully"}
              successLink={"/admin"}
              errorTitle="Something went wrong" formTitle="Enter user details" isUpdate={this.isEdit()}
              errorDescription={"Something went wrong while " + (this.isEdit() ? "saving your changes" : "creating your user")}
              cancelLink={"/admin"} />
          </div>
        </div>
      </div>
    );
  }
}

UserEdit.propTypes = {
  user: PropTypes.object.isRequired,
  userFormMapping: PropTypes.array.isRequired,
  createUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  setAppDescrition: PropTypes.func.isRequired,
  setAppTitle: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.userReducer,
    userFormMapping: state.userFormMappingReducer
  };
}

export default connect(mapStateToProps, { createUser, updateUser, setAppDescrition, setAppTitle, loadUser, passwordReset })(UserEdit);
