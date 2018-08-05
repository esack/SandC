import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createFileContainer, createFile, updateFileContainer, loadFileContainer, loadFileTypes } from '../../actions/file-actions';
import { setAppDescrition, setAppTitle } from '../../actions/app-actions';
import Form from '../common/form/form';

class FileContainerEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSuccessBox: false
    }

    this.isEdit = this.isEdit.bind(this);
    this.saveFileContainer = this.saveFileContainer.bind(this);
  }

  componentDidMount() {
    this.props.loadFileTypes();

    if (this.props.projectID === undefined && this.props.userID === undefined) {
      this.props.loadFileContainer(this.props.params.id);
    }
  }

  isEdit() {
    return this.props.fileContainer.files_container_id > 0;
  }

  saveFileContainer(event) {
    event.preventDefault();
    const fileToUpload = this.props.fileContainer.file;

    if (this.props.fileContainer.files_container_id === 0) {
      this.props.createFileContainer(this.props.fileContainer).then(response => {
        if (fileToUpload != undefined) {
          const file = {
            files_container_id: response.file_container.files_container_id,
            file_name: fileToUpload.name,
            file_version_description: "File created",
            file: fileToUpload
          };

          this.props.createFile(file).then(() => {
            this.setState({ showSuccessBox: true });
          });
        } else {
          this.setState({ showSuccessBox: true });
        }
      });
    } else {
      this.props.updateFileContainer(this.props.fileContainer.files_container_id,
        this.props.fileContainer).then(() => {
          this.setState({ showSuccessBox: true });
        });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <Form formMapping={this.props.fileContainerFormMapping}
            formData={this.props.fileContainer} onSubmit={this.saveFileContainer}
            submitButtonLabel={this.isEdit() ? "Save" : "Create"} showSuccessBox={this.state.showSuccessBox}
            successTitle={this.isEdit() ? "File container saved successfully" : "File container create successfully"}
            successDescription={this.isEdit() ? "The file container was saved successfully" : "The file container was created successfully"}
            successLink={
              this.props.projectID != undefined ? '/projects/' + this.props.projectID : '/clients/' + this.props.userID}
            successOnClick={this.props.successOnClick} errorTitle="Something went wrong" formTitle="Enter file container details"
            isUpdate={this.isEdit()} errorDescription={"Something went wrong while " + (this.isEdit() ? "saving your changes" : "creating your file container")}
            cancelLink={this.isEdit() === false ?
              this.props.projectID != undefined ? '/projects/' + this.props.projectID : '/clients/' + this.props.userID : null}
            cancelOnClick={this.props.cancelOnClick} />
        </div>
      </div>
    );
  }
}

FileContainerEdit.propTypes = {
  projectID: PropTypes.string,
  userID: PropTypes.string,
  fileContainer: PropTypes.object.isRequired,
  file: PropTypes.object,
  fileContainerFormMapping: PropTypes.array.isRequired,
  createFileContainer: PropTypes.func.isRequired,
  createFile: PropTypes.func.isRequired,
  updateFileContainer: PropTypes.func.isRequired,
  loadFileContainer: PropTypes.func.isRequired,
  successOnClick: PropTypes.func,
  cancelOnClick: PropTypes.func,
  loadFileTypes: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const fileContainer = state.fileContainerReducer.file_container;

  if (ownProps.projectID != undefined) {
    fileContainer.project_id = ownProps.projectID;
  }
  else if (ownProps.userID != undefined) {
    fileContainer.user_id = ownProps.userID;
  }

  const fileContainerFormMapping = Object.assign([], state.fileContainerFormMappingReducer);
  const fileContainerFormMappingTypes = fileContainerFormMapping.find(fileFormMap => fileFormMap.name == "file_type_id")

  if (fileContainerFormMappingTypes.options.length === 0 && state.fileTypesReducer.length > 0) {
    state.fileTypesReducer.forEach((fileType) => {
      fileContainerFormMappingTypes.options.push({
        text: fileType.file_type_title,
        value: fileType.file_type_id.toString()
      });
    });
  }

  return {
    fileContainer,
    file: state.fileReducer,
    fileContainerFormMapping
  };
}

export default connect(mapStateToProps, {
  createFileContainer,
  createFile,
  updateFileContainer,
  loadFileContainer,
  setAppDescrition,
  setAppTitle,
  loadFileTypes
})(FileContainerEdit);
