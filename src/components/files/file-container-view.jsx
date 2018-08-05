import React from 'react';
import PropTypes from 'prop-types';
import DropzoneComponent from 'react-dropzone-component';
import { connect } from 'react-redux';
import { loadFileContainer, createFile, loadFiles, updateFileContainer } from '../../actions/file-actions';
import { setAppTitle, setAppDescrition } from '../../actions/app-actions';
import FileContainerEdit from './file-container-edit';
import TextInputTitle from '../common/inputs/text-input-title';
import File from './file';
import Dropdown from '../common/inputs/dropdown';

class FileContainerView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      appTitleSet: false,
      show_add_file: false,
      file_version_description: ''
    }

    this.onEdit = this.onEdit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.setDropzoneFile = this.setDropzoneFile.bind(this);
    this.dropzoneInit = this.dropzoneInit.bind(this);
    this.saveFile = this.saveFile.bind(this);
    this.onFinalSelectionChange = this.onFinalSelectionChange.bind(this);

    this.componentConfig = {
      showFiletypeIcon: false,
      postUrl: 'no-url',
      maxFiles: 1
    };

    var _this = this;

    this.eventHandlers = {
      addedfile: file => _this.setDropzoneFile(file),
      init: dropzone => _this.dropzoneInit(dropzone)
    };

    this.djsConfig = {
      dictDefaultMessage: 'Drop files here or click to upload',
      autoProcessQueue: false
    };
  }

  componentDidMount() {
    this.props.loadFileContainer(this.props.params.id);
    this.props.loadFiles(this.props.params.id);
  }

  componentDidUpdate(nextProps) {
    if (this.state.appTitleSet === false && this.props.file_container.file_type != undefined
      && this.props.file_container.file_type !== "") {
      this.props.setAppTitle(this.props.file_container.file_type);
      this.props.setAppDescrition("");

      this.setState({ appTitleSet: true });
    }
  }

  dropzoneInit(dropzone) {
    dropzone.options.maxFiles = 1;
    this.setState({ dropzone });
  }

  setDropzoneFile(file) {
    this.props.file.file = file;
    this.props.file.file_name = file.name;

    $(".dz-progress").hide();
  }

  onEdit() {
    this.setState({
      editMode: true
    });
  }

  onClose() {
    this.props.loadFileContainer(this.props.params.id);

    this.setState({
      editMode: false,
      appTitleSet: false
    });
  }

  saveFile(event) {
    event.preventDefault();

    const _this = this;

    let uploadWidth = 0;
    let uploadFinish = false;

    const uploadInterval = setInterval(() => {
      uploadWidth++;

      if (uploadWidth > 100 && uploadFinish === false) {
        uploadWidth = 10;
      }

      $(".dz-upload").width(uploadWidth);
    }, 30);

    this.props.file.file_version_description = this.state.file_version_description;

    this.props.createFile(this.props.file).then(() => {
      uploadFinish = true;
      const waitForUploadInterval = setInterval(() => {
        if (uploadWidth >= 100) {
          clearInterval(waitForUploadInterval);
          clearInterval(uploadInterval);

          $(".dz-progress").hide();
          $(".dz-preview").addClass("dz-success");

          setTimeout(() => {
            _this.setState({ show_add_file: false });
          }, 5000);
        }
      }, 30);
    });
  }

  onFinalSelectionChange(e) {
    const selectedFileID = Number(e.target.value);
    this.props.file_container.approved_file_id = selectedFileID;

    if (selectedFileID > 0) {
      const selectFile = this.props.files.filter(file => file.file_id === selectedFileID)[0];

      this.props.file_container.approved_file_content_type = selectFile.content_type;
    } else {
      this.props.file_container.approved_file_content_type = null;
    }

    this.props.updateFileContainer(this.props.file_container.files_container_id,
      this.props.file_container);
  }

  render() {
    const { file_container, final_selection } = this.props;

    if (this.state.editMode) {
      return (
        <FileContainerEdit userID={file_container.user_id != null ? file_container.user_id.toString() : ""}
          projectID={file_container.project_id != null ? file_container.project_id.toString() : ""}
          successOnClick={this.onClose} cancelOnClick={this.onClose} />
      );
    } else {
      return (
        <div className="row">
          <div className="col-md-12">
            <h5>File Type: {file_container.file_type}</h5>
            <div className="btn  btn-info btn-flat pull-left" onClick={this.onEdit}>Edit file</div><br /><br />
            {this.props.files.length > 0 &&
              <div className="row">
                <div className="col-md-12">
                  <h5>Select final version:</h5>
                  <Dropdown name="finalSelection" onChange={this.onFinalSelectionChange}
                    value={file_container.approved_file_id} options={final_selection} />
                </div>
              </div>
            }
            <div className="box">
              <div className="box-header with-border">
                <h3 className="box-title">Files</h3>
                <div style={{ margin: '0 0 0 10px' }} className="btn  btn-info btn-flat" onClick={() => this.setState({ show_add_file: true })}>Add new file</div>
                <div className="box-tools pull-right">
                  <button type="button" className="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
                    <i className="fa fa-minus"></i></button>
                </div>
              </div>
              <div className="box-body">
                {this.state.show_add_file ?
                  <div>
                    <DropzoneComponent config={this.componentConfig} djsConfig={this.djsConfig} eventHandlers={this.eventHandlers} />
                    <form role="form" onSubmit={this.saveFile}>
                      <div className="box-body">
                        <TextInputTitle label="Description for this file version" placeholder="What changed" name="file_version_description"
                          value={this.state.file_version_description} onChange={e => this.setState({ file_version_description: e.target.value })} />
                      </div>
                      <div className="box-footer">
                        <button type="submit" className="btn btn-primary pull-right">Save</button>
                        <button type="botton" style={{ margin: '0 10px 0 0' }} onClick={(e) => this.setState({ show_add_file: false })} className="btn btn-primary pull-right">Cancel</button>
                      </div>
                    </form>
                  </div> : null}
                {this.props.files.length > 0 ?
                  this.props.files.map(file => <File key={file.file_id} file={file} />) : "No files uploaded"}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

FileContainerView.propTypes = {
  file_container: PropTypes.object.isRequired,
  files: PropTypes.array.isRequired,
  file: PropTypes.object.isRequired,
  loadFileContainer: PropTypes.func.isRequired,
  setAppTitle: PropTypes.func.isRequired,
  setAppDescrition: PropTypes.func.isRequired,
  updateFileContainer: PropTypes.func,
  createFile: PropTypes.func.isRequired,
  loadFiles: PropTypes.func.isRequired,
  final_selection: PropTypes.array
};

function mapStateToProps(state) {
  const file = state.fileReducer;
  const files = state.fileContainerReducer.files.sort((o1, o2) => (o1.file_id > o2.file_id ? -1 : 1));

  const finalSelection = state.fileContainerReducer.files.map((fileSelection) => {
    let edition = '';

    if (fileSelection.edition) {
      edition = ` edition: ${fileSelection.edition}`;
    }
    return ({ text: `${fileSelection.file_name}${edition} (${fileSelection.file_date})`, value: fileSelection.file_id });
  });

  if (state.fileContainerReducer.file_container.files_container_id > 0) {
    file.files_container_id = state.fileContainerReducer.file_container.files_container_id;
  }

  return {
    file_container: state.fileContainerReducer.file_container,
    files,
    file,
    final_selection: finalSelection
  };
}

export default connect(mapStateToProps, {
  loadFileContainer,
  setAppTitle,
  setAppDescrition,
  createFile,
  loadFiles,
  updateFileContainer
})(FileContainerView);
