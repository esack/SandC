import React from 'react';
import PropTypes from 'prop-types';
import DropzoneComponent from 'react-dropzone-component';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAuthorizationQuery } from '../../../api/api';
import { createFile, deleteFileContainer, createFileContainer } from '../../../actions/file-actions';
import { setPDFViewer, toggleModal } from '../../../actions/app-actions';
import Form from '../../common/form/form';

class LinkBoxInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      appTitleSet: false,
      show_add_file: false,
      file_version_description: '',
      dropzoneRef: null,
      show_file_form: false
    };

    this.setDropzoneFile = this.setDropzoneFile.bind(this);
    this.dropzoneInit = this.dropzoneInit.bind(this);
    this.saveFile = this.saveFile.bind(this);
    this.deleteFileContainer = this.deleteFileContainer.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.showFile = this.showFile.bind(this);

    this.componentConfig = {
      showFiletypeIcon: false,
      postUrl: 'no-url'
    };

    const self = this;

    this.eventHandlers = {
      addedfile: file => self.setDropzoneFile(file),
      init: dropzone => self.dropzoneInit(dropzone)
    };

    this.djsConfig = {
      dictDefaultMessage: 'Drop or click to upload',
      autoProcessQueue: false
    };
  }

  setDropzoneFile(file) {
    this.props.file.file = file;
    this.props.file.file_name = file.name;

    const date = new Date();

    const day = date.getDate();
    const monthIndex = date.getMonth() + 1;
    const year = date.getFullYear();

    this.props.file.file_date = `${day}/${monthIndex}/${year}`;

    this.setState({ show_file_form: true });

    $('.dz-progress').hide();
  }

  dropzoneInit(dropzone) {
    this.setState({ dropzoneRef: dropzone });
  }

  saveFile() {
    const self = this;
    const fileContainer = this.props.fileContainer;

    this.setState({ show_file_form: false });
    if (fileContainer.files_container_id === 0) {
      this.props.createFileContainer(fileContainer, this.props.token).then((response) => {
        self.uploadFile(response.file_container);
      });
    } else {
      this.uploadFile(fileContainer);
    }
  }

  uploadFile(fileContainer) {
    const self = this;
    let uploadWidth = 0;
    let uploadFinish = false;

    const uploadInterval = setInterval(() => {
      uploadWidth += 1;

      if (uploadWidth > 100 && uploadFinish === false) {
        uploadWidth = 10;
      }

      $('.dz-upload').width(uploadWidth);
    }, 30);

    this.props.file.files_container_id = fileContainer.files_container_id;
    this.props.file.file_version_description = '';

    this.props.createFile(this.props.file, this.props.token).then(() => {
      uploadFinish = true;
      const waitForUploadInterval = setInterval(() => {
        if (uploadWidth >= 100) {
          clearInterval(waitForUploadInterval);
          clearInterval(uploadInterval);

          $('.dz-progress').hide();
          $('.dz-preview').addClass('dz-success');

          setTimeout(() => {
            self.setState({ show_add_file: false });
            this.state.dropzoneRef.filse = null;
            $('.dz-started').attr('class', 'filepicker dropzone dz-clickable');
            $('.dz-preview').remove();
          }, 1000);
        }
      }, 30);
    });
  }

  deleteFileContainer() {
    if (confirm("Are you sure you would like to delete this file container and all it's content?")) {
      this.props.deleteFileContainer(this.props.fileContainer.files_container_id);
    }
  }

  showFile(url) {
    this.props.setPDFViewer(url);
    this.props.toggleModal(true);
  }

  render() {
    const { link, name, description, fileContainer, client } = this.props;
    if (link) {
      return (
        <div>
          <Link to={link}>
            <span className="info-box-text">{name}</span>
            <span className="info-box-number">{description}</span>
          </Link>
          <div className="fileActions">
            {
              client &&
              <sapn>
                <a href={getAuthorizationQuery(`${CONFIG.API_BASE_URL}api/File/Client/${client.user_id}/Files`, this.props.token)}>
                  <icon style={{ fontSize: '31px' }} className="fa fa-file-zip-o" /></a>
              </sapn>
            }
          </div>
        </div>
      );
    } else if (fileContainer) {
      return (
        <div>
          {fileContainer.file_download_link !== '' ?
            <a style={fileContainer.approved_file_id ? { color: "green" } : null} href={
              getAuthorizationQuery(fileContainer.file_download_link, this.props.token)
            }>{name}</a> :
            <div>
              <span className="info-box-text" style={{ color: 'red' }}>{name}</span>
            </div>
          }
          {
            fileContainer.show_upload &&
            <div style={{ display: !this.state.show_file_form ? "block" : "none" }}>
              <DropzoneComponent config={this.componentConfig}
                djsConfig={this.djsConfig}
                eventHandlers={this.eventHandlers} />
            </div>
          }
          {
            this.state.show_file_form &&
            <Form formMapping={this.props.fileContainerFormMapping}
              formData={this.props.file} onSubmit={this.saveFile}
              submitButtonLabel="Save" showSuccessBox={false}
              isUpdate={false} />
          }
          <div className="fileActions">
            {fileContainer.file_download_link !== '' &&
              <span>
                {fileContainer.file_download_content_type === 'application/pdf' && <a onClick={() => this.showFile(getAuthorizationQuery(fileContainer.file_download_link, this.props.token))}><icon className="fa fa-eye" /></a>}
                <a href={getAuthorizationQuery(fileContainer.file_download_link, this.props.token)}>
                  <icon className={fileContainer.approved_file_id ? 'fa fa-check' : 'fa fa-arrow-down'} /></a>
              </span>

            }
            {(!this.state.show_file_form && fileContainer.files_container_id > 0 && this.props.authUserReducer && this.props.authUserReducer.role === 'ADMIN') &&
              <sapn>
                <Link to={`/files/${fileContainer.files_container_id}`} href="#"><icon className="fa fa-gear" /></Link>
                <a onClick={() => this.deleteFileContainer()}><icon className="fa fa-close" /></a>
              </sapn>
            }
          </div>
        </div>
      );
    }

    return (
      <div>
        <span className="info-box-text">{name}</span>
        <span className="info-box-number">{description}</span>
      </div>
    );
  }
}

LinkBoxInfo.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  file: PropTypes.object.isRequired,
  fileContainer: PropTypes.object,
  token: PropTypes.string,  
  authUserReducer: PropTypes.object,
  client: PropTypes.object,
  createFile: PropTypes.func,
  createFileContainer: PropTypes.func,
  deleteFileContainer: PropTypes.func,
  toggleModal: PropTypes.func,
  setPDFViewer: PropTypes.func,
  fileContainerFormMapping: PropTypes.array
};

function mapStateToProps(state) {
  return {
    file: state.fileReducer,
    authUserReducer: state.authUserReducer,
    fileContainerFormMapping: state.fileSmallContainerFormMappingReducer
  };
}

export default connect(mapStateToProps, {
  createFile,
  deleteFileContainer,
  createFileContainer,
  toggleModal,
  setPDFViewer
})(LinkBoxInfo);
