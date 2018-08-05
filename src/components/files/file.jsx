import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteFile } from '../../actions/file-actions';
import { getAuthorizationQuery } from '../../api/api';
import { setPDFViewer, toggleModal } from '../../actions/app-actions';

class File extends React.Component {
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
    this.showFile = this.showFile.bind(this);
  }

  delete(event) {
    event.preventDefault();

    if (confirm("Are you sure you would like to delete this file version?")) {
      this.props.deleteFile(this.props.file.file_id);
    }
  }

  showFile(url) {
    this.props.setPDFViewer(url);
    this.props.toggleModal(true);
  }

  render() {
    return (
      <div className="row file-version">
        <div className="col-xs-10">
          <div className="col-xs-12">
            {this.props.file.file_name}
            {this.props.file.edition && <span> edition: {this.props.file.edition} </span>}
            <span> ({this.props.file.file_date}) </span>
          </div>
          {this.props.file.supplier_name && <div className="col-xs-12">From supplier{this.props.file.supplier_name}</div>}
          {this.props.file.version_description && <div className="col-xs-12">{this.props.file.version_description}</div>}
        </div>
        <div className="col-xs-2 fileActions" style={{ position: 'relative' }}>
          <span>
            {this.props.file.content_type === 'application/pdf' &&
              <a onClick={() => this.showFile(getAuthorizationQuery(this.props.file.file_download_link))}><icon className="fa fa-eye" /></a>}
          </span>
          <span>
            <a href={getAuthorizationQuery(this.props.file.file_download_link)}
              target="_download"><icon className="fa fa-download" /></a>
          </span>
          <span>
            <a href="#" onClick={this.delete}><icon className="fa fa-close" /></a>
          </span>
        </div>
      </div>
    );
  }
}

File.propTypes = {
  file: PropTypes.object.isRequired,
  deleteFile: PropTypes.func.isRequired,
  setPDFViewer: PropTypes.func,
  toggleModal: PropTypes.func
};


export default connect(null, { deleteFile, setPDFViewer, toggleModal })(File);
