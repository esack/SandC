import React from 'react';
import PropTypes from 'prop-types';
import { GithubPicker } from 'react-color';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getAuthorizationQuery } from '../../api/api';
import { setAppTitle, setAppDescrition } from '../../actions/app-actions';
import { projectClientStatusColors } from '../../actions/initial-state';
import { loadProject, setProjectClientStatusReset, createProjectClientStatus, updateProjectClientStatus, uploadClients, updateProject } from '../../actions/project-actions';
import { loadClients } from '../../actions/client-actions';
import { loadSuppliers } from '../../actions/supplier-actions';
import { loadFileContainersByProject, loadFileTypes, createFileTypes } from '../../actions/file-actions';

import LinkBoxes from '../common/links/link-boxes';
import TextInputTitle from '../common/inputs/text-input-title';
import TextInput from '../common/inputs/text-input';
import Tags from '../common/inputs/tags';
import FileUpload from '../common/inputs/file-uplaod';
import Dropdown from '../common/inputs/dropdown';

class ProjectView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appTitleSet: false,
      show_status_input: false,
      status_name: '',
      status_color: '',
      status_style: {},
      projectClientStatuses: [],
      clients_file: null,
      cliets_upload_state: '',
      clients_loading: true,
      suppliers_loading: true,
      project_files_loading: true,
      statuses_loading: true,
      uploaded_clients: [],
      fileTypeId: '',
      fileTypeTitle: '',
      newFileTypeTitle: '',
      showAddfileType: false,
      file_types_loading: true
    };

    this.addClientFile = this.addClientFile.bind(this);
    this.closeAddClientFile = this.closeAddClientFile.bind(this);
    this.onStatusEdit = this.onStatusEdit.bind(this);
    this.onStatusSave = this.onStatusSave.bind(this);
    this.onStatusCancel = this.onStatusCancel.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.onColorChange = this.onColorChange.bind(this);
    this.setClientsFile = this.setClientsFile.bind(this);
    this.uploadClientsFile = this.uploadClientsFile.bind(this);
    this.fileTypeChange = this.fileTypeChange.bind(this);
    this.newFileTypeChange = this.newFileTypeChange.bind(this);
    this.saveFileType = this.saveFileType.bind(this);
    this.deleteFileType = this.deleteFileType.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      status_name: nextProps.projectClientStatus.status_name,
      status_color: nextProps.projectClientStatus.status_color,
      projectClientStatuses: nextProps.projectClientStatuses
    });
  }

  componentDidUpdate(nextProps) {
    if (this.state.appTitleSet === false && this.props.project.project_name != undefined) {

      if (this.props.project.project_name != undefined && this.props.project.project_name !== "") {
        this.props.setAppTitle(this.props.project.project_name);
        this.props.setAppDescrition(this.props.project.description);
      }

      this.setState({ appTitleSet: true });
    }
  }

  componentDidMount() {
    this.props.loadFileTypes().then(r => {
      this.setState({ file_types_loading: false });
    });
    this.props.loadProject(this.props.params.id).then(r => {
      this.setState({ statuses_loading: false });
    });
    this.props.loadClients(this.props.params.id).then(r => {
      this.setState({ clients_loading: false });
    });
    this.props.loadSuppliers(this.props.params.id).then(r => {
      this.setState({ suppliers_loading: false });
    });
    this.props.loadFileContainersByProject(this.props.params.id).then(r => {
      this.setState({ project_files_loading: false });
    });
  }

  fileTypeChange(event) {
    this.setState({
      fileTypeId: event.target.value,
      fileTypeTitle: event.target.selectedOptions["0"].text
    });

    if (event.target.value == "-1") {
      this.setState({ showAddfileType: true });
    }
    else {
      this.setState({ showAddfileType: false });
    }
  }

  newFileTypeChange(event) {
    this.setState({ newFileTypeTitle: event.target.value });
  }

  saveFileType() {
    const project = Object.assign({}, this.props.project);

    if (this.state.showAddfileType) {
      this.props.createFileTypes({ file_type_id: 0, file_type_title: this.state.newFileTypeTitle }).then(response => {
        const fileType = { file_type_id: response.file_type.file_type_id, file_type_title: response.file_type.file_type_title, selected: true };

        project.project_file_types = [...project.project_file_types, fileType];

        this.props.updateProject(this.props.project.project_id, project);

        this.setState({
          showAddfileType: false,
          newFileTypeTitle: '',
          fileTypeId: '',
          fileTypeTitle: ''
        });
      });
    }
    else {
      const fileType = { file_type_id: this.state.fileTypeId, file_type_title: this.state.fileTypeTitle, selected: true };

      project.project_file_types = [...project.project_file_types, fileType];

      this.props.updateProject(this.props.project.project_id, project);

      this.setState({
        fileTypeId: '',
        fileTypeTitle: ''
      });
    }
  }

  deleteFileType(fileTypeId) {
    const project = Object.assign({}, this.props.project);
    const fileType = { file_type_id: fileTypeId, file_type_title: "", selected: false };

    project.project_file_types = project.project_file_types.filter(projectFileType => projectFileType.file_type_id != fileTypeId);

    project.project_file_types = [...project.project_file_types, fileType];

    this.props.updateProject(this.props.project.project_id, project);
  }

  addClientFile() {
    $("#upload-clients").show();
  }

  closeAddClientFile() {
    $("#upload-clients").hide();
  }

  onStatusEdit(e, status_id) {
    if (status_id > 0) {

      var projectClientStatus = $.grep(this.props.projectClientStatuses, function (e) { return e.status_id === status_id; })[0];

      this.props.projectClientStatus.status_name = projectClientStatus.status_name;
      this.props.projectClientStatus.status_color = projectClientStatus.status_color;
      this.props.projectClientStatus.status_id = projectClientStatus.status_id;

      var style = {};

      style.backgroundColor = projectClientStatus.status_color;
      style.color = projectClientStatus.status_text_color;

      this.setState({
        show_status_input: true,
        status_color: projectClientStatus.status_color,
        status_name: projectClientStatus.status_name,
        status_style: style
      });
    }
    else {
      this.props.projectClientStatus.status_name = '';
      this.props.projectClientStatus.status_color = '';
      this.props.projectClientStatus.status_id = 0;

      this.setState({
        show_status_input: false,
        status_color: '',
        status_name: '',
        status_style: {},
        edit_status_id: 0
      });

      this.setState({ show_status_input: true });
    }
  }

  onStatusSave() {
    var _this = this;

    if (this.props.projectClientStatus.status_id === 0) {
      this.props.createProjectClientStatus(this.props.projectClientStatus).then(response => {
        _this.onStatusCancel();
      });
    }
    else {
      this.props.updateProjectClientStatus(this.props.projectClientStatus.status_id, this.props.projectClientStatus).then(response => {
        _this.onStatusCancel();
      });
    }
  }

  onStatusCancel() {
    this.setState({
      show_status_input: false
    });
  }

  onStatusChange(e) {
    this.props.projectClientStatus.status_name = e.target.value;
    this.setState({ status_name: e.target.value });
  }

  onColorChange(color) {

    var style = Object.assign({}, this.state.status_style);

    style.backgroundColor = color.hex;

    if ($.inArray(color.hex.toUpperCase(), projectClientStatusColors.dark) !== -1)
      style.color = "#fff";
    else
      style.color = "";

    this.props.projectClientStatus.status_color = color.hex;

    this.setState({
      status_color: color.hex,
      status_style: style
    });
  }

  setClientsFile(file) {
    this.setState({ clients_file: file });
  }

  uploadClientsFile() {
    if (this.state.clients_file !== null) {
      $("#upload-clients .btn-primary").prop('disabled', true).html("Uploading...");
      this.setState({ cliets_upload_state: "start" });
      this.props.uploadClients(this.props.project.project_id, this.state.clients_file).then(response => {
        console.log(response);
        this.setState({ uploaded_clients: response.client_reports });
        this.props.loadClients(this.props.params.id);
        this.setState({ cliets_upload_state: "end" });
        $("#upload-clients .btn-primary").prop('disabled', true).html("Uploaded");
      });
    }
  }

  render() {
    return (
      <div>
        {this.props.authUserReducer.role == "ADMIN" &&
          <div>
            <h5>Status: {this.props.project.project_status}</h5>
            <h5>Buildings:  {this.props.project.project_buildings !== null ?
              this.props.project.project_buildings.map((building, i) => i > 0 ? ", " + building.building_name :
                building.building_name) : "No buildings set for this project"}
            </h5>
            <div>
              <Link className="btn  btn-info btn-flat pull-left" to={"/projects/edit/" + this.props.project.project_id}>Edit project details</Link>
              <br /><br />
            </div>
          </div>
        }
        <LinkBoxes showButtons={this.props.authUserReducer.role == "ADMIN"}
          title="Clients" link={'/clients/add/' + this.props.project.project_id} linkTitle="Add a new client"
          link2={getAuthorizationQuery(`${CONFIG.API_BASE_URL}api/File/Project/${this.props.project.project_id}/Files`)} linkTitle2="Get all approved files"
          loadnig={this.state.clients_loading} onClick={this.addClientFile} buttonTitle="Add clients from file"
          noBoxLinksMessage="No clients for this project" boxLinks={this.props.clients} />
        <div className="modal" id="upload-clients">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" onClick={this.closeAddClientFile} className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span></button>
                <h4 className="modal-title">Upload clients</h4>
              </div>
              <div className="modal-body">
                <p>Please upload an excel file it must include the following columns:<br />name, email, building, apartment_number<br />
                  It may also include the following columns:<br />phone, phone2, spouse_name, spouse_phone, number_of_rooms
                                </p>
                <FileUpload upload_state={this.state.cliets_upload_state} setFile={this.setClientsFile} />
              </div>
              <div className="modal-footer">
                <button type="button" onClick={this.closeAddClientFile} className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                <button type="button" onClick={this.uploadClientsFile} className="btn btn-primary">Upload</button>
              </div>
              <div className="box-header ui-sortable-handle">
                <i className="fa fa-inbox"></i>
                <h3 className="box-title">Upload report</h3>
                <div className="slimScrollDiv" style={{ position: "relative", overflow: "hidden", width: "auto", height: "100px" }}>
                  <div className="box-body chat" id="chat-box" style={{ overflow: "hidden", width: "auto0", height: "100px", overflowY: "scroll" }}>
                    {
                      this.state.uploaded_clients.map((uploaded_client, i) =>
                        <div key={i}>
                          {uploaded_client.client.name} - {uploaded_client.error_message !== null ? uploaded_client.error_message : "Uploaded"}
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.props.authUserReducer.role == "ADMIN" ?
          <LinkBoxes title="Suppliers" link={'/suppliers/add/' + this.props.project.project_id} linkTitle="Add a new Supplier"
            noBoxLinksMessage="No Supplier for this project" boxLinks={this.props.suppliers} loadnig={this.state.suppliers_loading} />
          : null}
        {this.props.authUserReducer.role == "ADMIN" ?
          <LinkBoxes title="Project files" link={'/projects/files/add/' + this.props.project.project_id} linkTitle="Add a new file"
            noBoxLinksMessage="No files for this project" boxLinks={this.props.fileContainers} loadnig={this.state.project_files_loading} />
          : null}
        {this.props.authUserReducer.role == "ADMIN" ?
          <div className="box">
            <div className="box-header with-border">
              <div className="row">
                <div className="col-md-3 col-sm-4 col-lg-2 col-xs-12">
                  <h3 className="box-title">Client file types</h3>
                </div>
                <div className="col-md-3 col-xs-12 col-sm-3 col-lg-2">
                  <Dropdown name="fileType" onChange={this.fileTypeChange}
                    value={this.state.fileTypeId} options={this.props.fileTypes} />
                </div>
                {this.state.showAddfileType ?
                  <div className="col-md-3 col-xs-12 col-sm-3 col-lg-2">
                    <TextInput name="newFileType" onChange={this.newFileTypeChange} value={this.state.newFileTypeTitle} />
                  </div> : null
                }
                <div className="col-md-3 col-xs-12 col-sm-3 col-lg-2">
                  <div className="btn  btn-info btn-flat col-xs-12" onClick={this.saveFileType}>Add file type</div>
                </div>
              </div>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i className="fa fa-minus"></i></button>
              </div>
            </div>
            <div className="box-body">
              {this.props.project.project_file_types.length > 0 ?
                <Tags tags={this.props.project.project_file_types} tagKeyName="file_type_id" tagValueName="file_type_title"
                  disabled onRemove={this.deleteFileType} tagIdName="file_type_id" /> :
                this.state.file_types_loading ? "Loading..." : "No file types set"}
            </div>
          </div>
          : null}
        {this.props.authUserReducer.role == "ADMIN" ?

          <div className="box">
            <div className="box-header with-border">
              <div className="row">
                <div className="col-md-3 col-sm-4 col-lg-2 col-xs-12">
                  <h3 className="box-title">Client Statuses</h3>
                </div>
                <div className="col-md-3 col-xs-12 col-sm-3 col-lg-2">
                  <div className="btn  btn-info btn-flat col-xs-12" onClick={(e) => this.onStatusEdit(e, 0)}>Add a new status</div>
                </div>
              </div>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i className="fa fa-minus"></i></button>
              </div>
            </div>
            <div className="box-body">
              {this.state.show_status_input ?
                <div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="box-header with-border">
                        <h3 className="box-title">Enter status details</h3>
                      </div>
                      <div className="box-body">
                        <TextInputTitle label="Status" placeholder="Enter status name" name="status_name" onChange={this.onStatusChange} style={this.state.status_style} value={this.state.status_name} />
                        <GithubPicker onChangeComplete={this.onColorChange} colors={projectClientStatusColors.dark.concat(projectClientStatusColors.light)} />
                      </div>
                      <div className="box-footer">
                        <button type="submit" className="btn btn-primary pull-right" onClick={this.onStatusSave}>Save</button>
                        <div style={{ margin: '0 10px 0 0' }} className="btn btn-primary pull-right" onClick={this.onStatusCancel}>Cancel</div>
                      </div>
                    </div>
                  </div>
                </div> : null
              }
              {this.props.projectClientStatuses.length > 0 ?
                <Tags tags={this.props.projectClientStatuses} tagKeyName="status_id" tagValueName="status_name"
                  tagColorName="status_color" tagTextColorName="status_text_color" disabled onEdit={this.onStatusEdit} /> :
                this.state.statuses_loading ? "Loading..." : "No statuses set"}
            </div>
          </div>
          : null}
      </div>
    );
  }
}

ProjectView.propTypes = {
  project: PropTypes.object.isRequired,
  projectClientStatuses: PropTypes.array.isRequired,
  projectClientStatus: PropTypes.object.isRequired,
  clients: PropTypes.array.isRequired,
  suppliers: PropTypes.array.isRequired,
  fileContainers: PropTypes.array.isRequired,
  setAppTitle: PropTypes.func.isRequired,
  setAppDescrition: PropTypes.func.isRequired,
  loadProject: PropTypes.func.isRequired,
  loadClients: PropTypes.func.isRequired,
  loadSuppliers: PropTypes.func.isRequired,
  loadFileContainersByProject: PropTypes.func.isRequired,
  setProjectClientStatusReset: PropTypes.func.isRequired,
  createProjectClientStatus: PropTypes.func.isRequired,
  updateProjectClientStatus: PropTypes.func.isRequired,
  uploadClients: PropTypes.func.isRequired,
  authUserReducer: PropTypes.object.isRequired,
  fileTypes: PropTypes.array,
  createFileTypes: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  loadFileTypes: PropTypes.func
}

function mapStateToProps(state) {
  const clientBoxLinks = [];
  const suppliersBoxLinks = [];
  const fileContainers = state.filesContainerReducer.sort((o1, o2) =>
    o1.files_container_id < o2.files_container_id ? -1 : 1
  );
  const fileContainersBoxLinks = [];
  const projectClientStatus = state.projectClientStatusReducer;
  const projectClientStatuses = state.projectReducer.project_client_statuses.sort((o1, o2) =>
    o1.status_id > o2.status_id ? -1 : 1
  );

  state.clientsReducer.forEach((client) => {
    clientBoxLinks.push({
      name: client.name,
      description: `${client.building} - ${client.apartment_number}`,
      backgroundColor: state.authUserReducer.role === 'ADMIN' ? client.status_color : '',
      link: `/clients/${client.user_id}`,
      icon: 'fa-user',
      client
    });
  });

  state.suppliersReducer.forEach((supplier) => {
    suppliersBoxLinks.push({
      name: supplier.supplier_name,
      description: '',
      link: `/suppliers/${supplier.supplier_id}`,
      icon: 'fa-wrench'
    });
  });

  fileContainers.forEach((fileContainer) => {
    fileContainersBoxLinks.push({
      name: fileContainer.file_type,
      description: '',
      fileContainer,
      icon: 'fa-file-o'
    });
  });

  projectClientStatuses.forEach((status) => {
    if ($.inArray(status.status_color.toUpperCase(), projectClientStatusColors.dark) !== -1) {
      status.status_text_color = '#fff';
    }
  });

  projectClientStatus.project_id = state.projectReducer.project_id;

  const fileTypes = state.fileTypesReducer
    .filter(fileType => state.projectReducer.project_file_types.findIndex(projectFileType =>
      projectFileType.file_type_id === fileType.file_type_id) === -1)
    .map(fileType => ({ value: fileType.file_type_id, text: fileType.file_type_title }));

  return {
    projectClientStatuses,
    project: state.projectReducer,
    projectClientStatus,
    clients: clientBoxLinks,
    suppliers: suppliersBoxLinks,
    fileContainers: fileContainersBoxLinks,
    authUserReducer: state.authUserReducer,
    fileTypes: [...fileTypes, { value: -1, text: "Other" }]
  };
}

export default connect(mapStateToProps,
  {
    setAppTitle,
    setAppDescrition,
    loadProject,
    loadClients,
    loadSuppliers,
    loadFileContainersByProject,
    setProjectClientStatusReset,
    createProjectClientStatus,
    updateProjectClientStatus,
    uploadClients,
    loadFileTypes,
    createFileTypes,
    updateProject
  })(ProjectView);
