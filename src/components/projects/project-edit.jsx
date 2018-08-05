import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProject, updateProject, loadProject, setProjectReset } from '../../actions/project-actions';
import { createSupplier, updateSupplier, loadSupplier } from '../../actions/supplier-actions';
import { setAppDescrition, setAppTitle } from '../../actions/app-actions';
import Form from '../common/form/form'

class ProjectEdit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showSuccessBox: false
    }

    this.isEdit = this.isEdit.bind(this);
    this.saveProject = this.saveProject.bind(this);
  };

  componentWillMount() {
    if (this.props.params.id != undefined) {
      this.props.loadProject(this.props.params.id).then(r => {
        this.props.setAppTitle("S & C");
        this.props.setAppDescrition("Edit project");
      });
    }
    else {
      this.props.setProjectReset();
      this.props.setAppTitle("S & C");
      this.props.setAppDescrition("Add new Project");
    }
  }

  isEdit() {
    return this.props.project.project_id > 0
  }

  saveProject(event) {
    event.preventDefault();

    let contractor_supplier = {
      supplier_id: 0,
      project_id: 0,
      supplier_name: this.props.project.contractor_supplier_name,
      phone: this.props.project.contractor_supplier_phone,
      is_public: false
    }

    if (this.props.project.project_id === 0) {
      this.props.createProject(this.props.project).then(response => {
        contractor_supplier.project_id = response.project.project_id
        this.props.createSupplier(contractor_supplier).then(response => {
          this.props.project.contractor_supplier_id = response.supplier.supplier_id;
          this.props.updateProject(this.props.project.project_id, this.props.project).then(response => {
            this.setState({ showSuccessBox: true });
          });
        });
      });
    }
    else {
      if (this.props.project.contractor_supplier_id === null) {
        contractor_supplier.project_id = this.props.project.project_id;
        this.props.createSupplier(contractor_supplier).then(response => {
          this.props.project.contractor_supplier_id = response.supplier.supplier_id;
          this.props.updateProject(this.props.project.project_id, this.props.project).then(response => {
            this.setState({ showSuccessBox: true });
          });
        });
      }
      else {
        contractor_supplier.supplier_id = this.props.project.contractor_supplier_id;
        contractor_supplier.project_id = this.props.project.project_id;
        this.props.updateSupplier(this.props.project.contractor_supplier_id, contractor_supplier).then(response => {
          this.props.updateProject(this.props.project.project_id, this.props.project).then(response => {
            this.setState({ showSuccessBox: true });
          });
        });
      }
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <Form formMapping={this.props.projectFormMapping} formData={this.props.project} onSubmit={this.saveProject}
            submitButtonLabel={this.isEdit() ? "Save" : "Create"} showSuccessBox={this.state.showSuccessBox}
            successTitle={this.isEdit() ? "Project saved successfully" : "Project create successfully"}
            successDescription={this.isEdit() ? "The project was saved successfully" : "The project was created successfully"}
            successLink={this.isEdit() ? '/projects/' + this.props.project.project_id : "/projects"}
            errorTitle="Something went wrong" formTitle="Enter project details" isUpdate={this.isEdit()}
            errorDescription={"Something went wrong while " + (this.isEdit() ? "saving your changes" : "creating your project")}
            cancelLink={this.isEdit() ? "/projects/ " + this.props.project.project_id : "/projects"} />
        </div>
      </div>
    );
  }
}

ProjectEdit.propTypes = {
  project: PropTypes.object.isRequired,
  projectFormMapping: PropTypes.array.isRequired,
  createProject: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  loadProject: PropTypes.func.isRequired,
  setProjectReset: PropTypes.func.isRequired,
  setAppDescrition: PropTypes.func.isRequired,
  setAppTitle: PropTypes.func.isRequired,
  createSupplier: PropTypes.func.isRequired,
  updateSupplier: PropTypes.func.isRequired,
  loadSupplier: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    project: state.projectReducer,
    projectFormMapping: state.projectFormMappingReducer,
  };
}

export default connect(mapStateToProps,
  { createProject, updateProject, loadProject, setProjectReset, setAppDescrition, setAppTitle, createSupplier, updateSupplier, loadSupplier })(ProjectEdit);
