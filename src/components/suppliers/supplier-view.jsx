import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadSupplier, loadContacts, updateSupplier } from '../../actions/supplier-actions';
import { setAppTitle, setAppDescrition } from '../../actions/app-actions';
import { loadFileTypes } from '../../actions/file-actions';
import SupplierEdit from './supplier-edit';
import LinkBoxes from '../common/links/link-boxes';
import Dropdown from '../common/inputs/dropdown';
import Tags from '../common/inputs/tags';

class SupplierView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      contacts_loaded: true,
      file_types_loading: true,
      fileTypeTitle: "",
      fileTypeId: 0
    };

    this.onEdit = this.onEdit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.deleteFileType = this.deleteFileType.bind(this);
    this.fileTypeChange = this.fileTypeChange.bind(this);
    this.saveFileType = this.saveFileType.bind(this);
  }

  componentDidMount() {
    this.props.loadSupplier(this.props.params.id).then(() => {
      if (this.props.supplier_data && this.props.supplier_data.supplier_name !== '') {
        this.props.setAppTitle(this.props.supplier_data.supplier_name);
        this.props.setAppDescrition('');
        this.setState({ file_types_loading: false });
      }
    });

    this.props.loadContacts(this.props.params.id).then(() => {
      this.setState({ contacts_loaded: false });
    });

    this.props.loadFileTypes();
  }

  onEdit() {
    this.setState({
      editMode: true
    });
  }

  onClose() {
    this.props.loadSupplier(this.props.params.id);

    this.setState({
      editMode: false
    });
  }

  saveFileType() {
    const supplier = Object.assign({}, this.props.supplier_data);

    const objIndex = supplier.file_types.findIndex((fileType => fileType.file_type_id == this.state.fileTypeId));

    supplier.file_types[objIndex].selected = true;    

    this.props.updateSupplier(supplier.supplier_id, supplier);

    this.setState({
      fileTypeId: '',
      fileTypeTitle: ''
    });
  }

  fileTypeChange(event) {
    this.setState({
      fileTypeId: event.target.value,
      fileTypeTitle: event.target.selectedOptions["0"].text
    });
  }

  deleteFileType(fileTypeId) {
    const supplier = Object.assign({}, this.props.supplier_data);
    
    const objIndex = supplier.file_types.findIndex((fileType => fileType.file_type_id == fileTypeId));

    supplier.file_types[objIndex].selected = false;    

    this.props.updateSupplier(this.props.supplier_data.supplier_id, supplier);
  }

  render() {
    if (this.state.editMode) {
      return (
        <SupplierEdit successOnClick={this.onClose} cancelOnClick={this.onClose} />
      );
    }

    return (
      <div>
        <h5>Phone: {this.props.supplier_data.phone}</h5>
        <h5>Email: {this.props.supplier_data.email}</h5>
        <h5>Website: {this.props.supplier_data.website}</h5>
        <h5>{this.props.supplier_data.is_public ? "This Supplier is public and can be viewed by clinets" : "This Supplier is private"}</h5>
        <div className="btn  btn-info btn-flat pull-left" onClick={this.onEdit}>Edit Supplier details</div><br /><br />
        <LinkBoxes title="Contacts" link={'/suppliers/contacts/add/' + this.props.supplier_data.supplier_id} linkTitle="Add a new contact"
          noBoxLinksMessage="No contacts for this project" boxLinks={this.props.contacts} loadnig={this.state.contacts_loaded} />
        {
          this.props.authUserReducer.role === 'ADMIN' &&
          <div className="box">
            <div className="box-header with-border">
              <div className="row">
                <div className="col-md-3 col-sm-4 col-lg-2 col-xs-12">
                  <h3 className="box-title">Supplier file types</h3>
                </div>
                <div className="col-md-3 col-xs-12 col-sm-3 col-lg-2">
                  <Dropdown name="fileType" onChange={this.fileTypeChange}
                    value={this.state.fileTypeId} options={this.props.fileTypes} />
                </div>
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
              {
                this.props.selectedFileTypes.length > 0 ?
                  <Tags tags={this.props.selectedFileTypes} tagKeyName="file_type_id" tagValueName="file_type_title"
                    disabled onRemove={this.deleteFileType} tagIdName="file_type_id" /> :
                  this.state.file_types_loading ? "Loading..." : "No file types set"
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

SupplierView.propTypes = {
  loadContacts: PropTypes.func,
  setAppTitle: PropTypes.func,
  setAppDescrition: PropTypes.func,
  params: PropTypes.object,
  supplier_data: PropTypes.object,
  authUserReducer: PropTypes.object,
  loadSupplier: PropTypes.func,
  loadFileTypes: PropTypes.func,
  updateSupplier: PropTypes.func,
  selectedFileTypes: PropTypes.array,
  fileTypes: PropTypes.array,
  contacts: PropTypes.array
};

function mapStateToProps(state) {
  const contactBoxLinks = [];

  state.supplierReducer.contacts.forEach((contact) => {
    contactBoxLinks.push({
      name: contact.name,
      description: contact.title,
      link: '/suppliers/contacts/' + contact.user_id,
      icon: 'fa-user'
    });
  });

  const fileTypes = state.supplierReducer.supplier_data.file_types.filter(fileType => !fileType.selected).map((fileType) => { return { value: fileType.file_type_id, text: fileType.file_type_title }; });
  const selectedFileTypes = state.supplierReducer.supplier_data.file_types.filter(fileType => fileType.selected);
 
  return {
    supplier_data: state.supplierReducer.supplier_data,
    contacts: contactBoxLinks,
    authUserReducer: state.authUserReducer,
    fileTypes,
    selectedFileTypes
  };
}

export default connect(mapStateToProps, {
  loadSupplier,
  loadContacts,
  setAppTitle,
  setAppDescrition,
  loadFileTypes,
  updateSupplier
})(SupplierView);
