import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LinkBoxes from '../common/links/link-boxes';
import { loadClient } from '../../actions/client-actions';
import { setAppTitle, setAppDescrition } from '../../actions/app-actions';
import { loadFileContainersByClient } from '../../actions/file-actions';
import { passwordReset } from '../../actions/user-actions';
import ClientEdit from './client-edit';


class ClientView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      appTitleSet: false,
      files_container_loaded: true
    };

    this.onEdit = this.onEdit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  componentDidMount() {
    this.props.loadClient(this.props.params.id).then(() => {
      this.props.setAppTitle(this.props.client.name);
      this.props.setAppDescrition('');
    });

    this.props.loadFileContainersByClient(this.props.params.id).then(() => {
      this.setState({ files_container_loaded: false });
    });
  }

  onEdit() {
    this.setState({
      editMode: true
    });
  }

  onClose() {
    this.props.loadClient(this.props.params.id);

    this.setState({
      editMode: false,
      appTitleSet: false
    });
  }

  resetPassword(e) {
    e.preventDefault();

    if (this.props.client.email !== null && this.props.client.email !== "") {
      this.props.passwordReset(this.props.client.email).then(() => {
        this.setState({ showPasswordResetSent: true });
      });
    }
  }

  render() {
    if (this.state.editMode) {
      return (
        <ClientEdit successOnClick={this.onClose} cancelOnClick={this.onClose} />
      );
    }
    else {
      return (
        <div>
          <div className="row">
            <div className="col-xs-3"><h5>Status: {this.props.client.status_name}</h5></div>
            <div className="col-xs-3"></div>
            <div className="col-xs-3"></div>
          </div>
          <div className="row">
            <div className="col-xs-3"><h5>Email: {this.props.client.email}</h5></div>
            {this.props.authUserReducer.role == "ADMIN" ?
              <div className="col-xs-3"><h5>Password: <a href="#" onClick={this.resetPassword}>Send Reset password</a></h5></div>
              : null}
            <div className="col-xs-3"></div>
          </div>
          <div className="row">
            <div className="col-xs-3"><h5>Phone: {this.props.client.phone}</h5></div>
            <div className="col-xs-3"><h5>Other Phone: {this.props.client.phone2}</h5></div>
            <div className="col-xs-3"></div>
          </div>
          <div className="row">
            <div className="col-xs-3"><h5>Spouse: {this.props.client.spouse_name}</h5></div>
            <div className="col-xs-3"><h5>Spouse phone: {this.props.client.spouse_phone}</h5></div>
            <div className="col-xs-3"></div>
          </div>
          <div className="row">
            <div className="col-xs-3"><h5>Building: {this.props.client.building}</h5></div>
            <div className="col-xs-3"><h5>Apartment: {this.props.client.apartment_number}</h5></div>
            <div className="col-xs-3"><h5>Number of rooms: {this.props.client.number_of_rooms}</h5></div>
          </div>
          {this.props.authUserReducer.role == "ADMIN" ?
            <div>
              <div className="btn  btn-info btn-flat pull-left" onClick={this.onEdit}>Edit client details</div><br /><br /></div>
            : null}
          <LinkBoxes title="Client files"
            noBoxLinksMessage="No files for this client" 
            boxLinks={this.props.fileContainers} 
            loadnig={this.state.files_container_loaded} />
          <div className="box">
            <div className="box-header with-border">
              <h3 className="box-title">Messages</h3>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i className="fa fa-minus"></i></button>
              </div>
            </div>
            <div className="box-body">
          
            <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      );
    }
  }
}

ClientView.propTypes = {
  client: PropTypes.object.isRequired,
  loadClient: PropTypes.func.isRequired,
  authUserReducer: PropTypes.object,
  fileContainers: PropTypes.array,
  params: PropTypes.object,
  setAppTitle: PropTypes.func,
  setAppDescrition: PropTypes.func,
  loadFileContainersByClient: PropTypes.func,
  passwordReset: PropTypes.func
};

function mapStateToProps(state) {
  const fileContainers = state.filesContainerReducer.sort(function (o1, o2) {
    return o1.file_type_id < o2.file_type_id ? -1 : 1;
  });
  
  const filesBoxLinks = [];

  fileContainers.forEach(function (fileContainer) {
    filesBoxLinks.push({
      name: fileContainer.file_type,
      description: "",
      fileContainer,
      icon: "fa-file-o"
    });
  });

  return {
    client: state.clientReducer,
    fileContainers: filesBoxLinks,
    authUserReducer: state.authUserReducer
  };
}

export default connect(mapStateToProps, { 
  loadClient, 
  setAppTitle, 
  setAppDescrition, 
  loadFileContainersByClient,
  passwordReset
})(ClientView);
