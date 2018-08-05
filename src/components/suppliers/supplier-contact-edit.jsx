import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { passwordReset } from '../../actions/user-actions';
import { createContact, updateContact, loadContact, loadSupplier, sendSupplierURL } from '../../actions/supplier-actions';
import { loadFileTypes } from '../../actions/file-actions';
import Form from '../common/form/form';
import Dropdown from '../common/inputs/dropdown';

class ContactEdit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showSuccessBox: false,
      showPasswordResetSent: false,
      fileTypeTitle: '',
      fileTypeId: 0,
      link: null,
      copied: false
    };

    this.isEdit = this.isEdit.bind(this);
    this.saveContact = this.saveContact.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.fileTypeChange = this.fileTypeChange.bind(this);
    this.generateLink = this.generateLink.bind(this);
    this.copyLink = this.copyLink.bind(this);
  }

  componentDidMount() {
    if (this.props.supplierID === undefined) {
      this.props.loadContact(this.props.params.id).then(() => {
        this.props.loadSupplier(this.props.contact.supplier_id).then(() => {
          this.props.loadFileTypes();
        });
      });
    }
  }

  isEdit() {
    return this.props.contact.user_id > 0
  }

  fileTypeChange(event) {
    this.setState({
      fileTypeId: event.target.value,
      fileTypeTitle: event.target.selectedOptions["0"].text
    });
  }

  resetPassword() {
    this.props.passwordReset(this.props.contact.email).then(response => {
      this.setState({ showPasswordResetSent: true });
    });
  }

  saveContact(event) {
    event.preventDefault();

    if (this.props.contact.user_id === 0) {
      this.props.createContact(this.props.contact).then(response => {
        this.setState({ showSuccessBox: true });
      });
    } else {
      this.props.updateContact(this.props.contact.user_id, this.props.contact).then(response => {
        this.setState({ showSuccessBox: true });
      });
    }
  }

  generateLink() {
    this.props.sendSupplierURL(
      this.props.contact.user_id,
      this.state.fileTypeId
    ).then((response) => {
      this.setState({ link: response.url });
    });
  }

  copyLink() {

  }

  render() {
    return (
      <div>
        {this.isEdit() &&
          <div>
            <div className="btn  btn-info btn-flat pull-left" onClick={this.resetPassword} >Reset password</div>
            <br /><br />
            {this.state.showPasswordResetSent ? <div>Email with password reset instructions was sent to {this.props.contact.email}<br /><br /></div> : ""}
          </div>
        }
        <div className="row">
          <div className="col-md-6">
            <Form formMapping={this.props.contactFormMapping} formData={this.props.contact} onSubmit={this.saveContact}
              submitButtonLabel={this.isEdit() ? "Save" : "Create"} showSuccessBox={this.state.showSuccessBox}
              successTitle={this.isEdit() ? "Contact saved successfully" : "Contact create successfully"}
              successDescription={this.isEdit() ? "The contact was saved successfully" : "The contact was created successfully"}
              successLink={"/suppliers/" + this.props.contact.supplier_id}
              errorTitle="Something went wrong" formTitle="Enter contact details" isUpdate={this.isEdit()}
              errorDescription={"Something went wrong while " + (this.isEdit() ? " saving your changes" : "creating the contact")}
              cancelLink={this.isEdit() === false ? "/suppliers/" + this.props.supplierID : "/suppliers/" + this.props.contact.supplier_id} />
            <div className="box">
              <div className="box-header with-border">
                <div className="row">
                  <div className="col-xs-12">
                    <h3 className="box-title">Supplier file URL generator</h3>
                  </div>
                </div>
                <div className="box-tools pull-right">
                  <button type="button" className="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
                    <i className="fa fa-minus"></i></button>
                </div>
              </div>
              <div className="box-body">
                <div className="row">
                  <div className="col-xs-4">
                    <Dropdown name="fileType" onChange={this.fileTypeChange}
                      value={this.state.fileTypeId} options={this.props.fileTypes} />
                  </div>
                  <div className="col-xs-8">
                    <div onClick={this.generateLink} className="btn  btn-info btn-flat col-xs-12">Generate and send link to Email {this.props.contact.email}</div>
                  </div>
                </div>
                {this.state.link &&
                  <div className="row">
                    <div className="col-xs-12">
                      <a href={this.state.link}>Click to see supplier's link</a> You will need to logout to see what the supplier will see.
                      </div>
                    <div className="col-xs-12">
                      <CopyToClipboard text={this.state.link}
                        onCopy={() => this.setState({ copied: true })}>
                        <div className="btn btn-info btn-flat">{!this.state.copied ? 'Copy to clipboard' : 'Copied...'}</div>
                      </CopyToClipboard>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ContactEdit.propTypes = {
  params: PropTypes.object,
  supplierID: PropTypes.string,
  contact: PropTypes.object.isRequired,
  contactFormMapping: PropTypes.array.isRequired,
  createContact: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired,
  loadContact: PropTypes.func.isRequired,
  passwordReset: PropTypes.func,
  loadFileTypes: PropTypes.func,
  loadSupplier: PropTypes.func,
  sendSupplierURL: PropTypes.func,
  fileTypes: PropTypes.array
};

function mapStateToProps(state, ownProps) {
  const contact = state.contactReducer;

  if (ownProps.supplierID != undefined) {
    contact.supplier_id = ownProps.supplierID;
  }

  const fileTypes = state.supplierReducer.supplier_data.file_types.filter(fileType => fileType.selected).map((fileType) => { return { value: fileType.file_type_id, text: fileType.file_type_title }; });

  return {
    contact,
    fileTypes,
    contactFormMapping: state.contactFormMappingReducer
  };
}

export default connect(mapStateToProps,
  {
    createContact,
    updateContact,
    loadContact,
    passwordReset,
    loadFileTypes,
    loadSupplier,
    sendSupplierURL
  })(ContactEdit);
