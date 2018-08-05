import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadProject } from '../../actions/project-actions';
import { createClient, updateClient, setClientReset } from '../../actions/client-actions';
import { setAppDescrition, setAppTitle } from '../../actions/app-actions';
import Form from '../common/form/form'

class ClientEdit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showSuccessBox: false
    }

    this.isEdit = this.isEdit.bind(this);
    this.saveClient = this.saveClient.bind(this);
  };

  componentWillMount() {
    if (this.props.projectID != undefined) {
      this.props.loadProject(this.props.projectID);
    }
    else if (this.props.client.project_id > 0) {
      this.props.loadProject(this.props.client.project_id);
    }
  }

  isEdit() {
    return this.props.client.user_id > 0
  }

  saveClient(event) {
    event.preventDefault();
    if (this.props.client.user_id === 0) {
      this.props.createClient(this.props.client).then(response => {
        this.setState({ showSuccessBox: true });
      });
    }
    else {
      this.props.updateClient(this.props.client.user_id, this.props.client).then(response => {
        this.setState({ showSuccessBox: true });
      });;
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <Form formMapping={this.props.clientFormMapping} formData={this.props.client} onSubmit={this.saveClient}
            submitButtonLabel={this.isEdit() ? "Save" : "Create"} showSuccessBox={this.state.showSuccessBox}
            successTitle={this.isEdit() ? "Client saved successfully" : "Client create successfully"}
            successDescription={this.isEdit() ? "The client was saved successfully" : "The client was created successfully"}
            successLink={this.props.projectID != undefined ? "/projects/" + this.props.projectID : undefined} successOnClick={this.props.successOnClick}
            errorTitle="Something went wrong" formTitle="Enter client details" isUpdate={this.isEdit()}
            errorDescription={"Something went wrong while " + (this.isEdit() ? "saving your changes" : "creating your client")}
            cancelLink={this.props.projectID != undefined ? "/projects/" + this.props.projectID : undefined} cancelOnClick={this.props.cancelOnClick} />
        </div>
      </div>
    );
  }
}

ClientEdit.propTypes = {
  projectID: PropTypes.string,
  client: PropTypes.object.isRequired,
  clientFormMapping: PropTypes.array.isRequired,
  createClient: PropTypes.func.isRequired,
  updateClient: PropTypes.func.isRequired,
  loadProject: PropTypes.func.isRequired,
  setClientReset: PropTypes.func.isRequired,
  setAppDescrition: PropTypes.func.isRequired,
  setAppTitle: PropTypes.func.isRequired,
  successOnClick: PropTypes.func,
  cancelOnClick: PropTypes.func
}

function mapStateToProps(state, ownProps) {

  const client = state.clientReducer;

  if (ownProps.projectID != undefined) {
    client.project_id = ownProps.projectID;
  }

  const clientFormMapping = Object.assign([], state.clientFormMappingReducer);

  const clientFormMappBuilding = clientFormMapping.find(clientFormMapp => clientFormMapp.name === "building_id")

  if (clientFormMappBuilding.options.length === 0 && state.projectReducer.project_buildings.length > 0) {
    state.projectReducer.project_buildings.forEach(function (building) {
      clientFormMappBuilding.options.push({ text: building.building_name, value: building.building_id.toString() });
    });
  }

  const clientFormMappStatuses = clientFormMapping.find(clientFormMapp => clientFormMapp.name === "status_id")

  if (clientFormMappStatuses.options.length === 0 && state.projectReducer.project_client_statuses.length > 0) {
    state.projectReducer.project_client_statuses.forEach(function (project_client_status) {
      clientFormMappStatuses.options.push({ text: project_client_status.status_name, value: project_client_status.status_id.toString() });
    });
  }

  return {
    client: client,
    clientFormMapping: clientFormMapping
  };
}

export default connect(mapStateToProps, { createClient, updateClient, setClientReset, setAppDescrition, setAppTitle, loadProject })(ClientEdit);
