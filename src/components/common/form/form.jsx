import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormInput from './form-input';
import { Link } from 'react-router';
import SuccessfulBox from '../successful-box';
import ErrorBox from '../error-box'
import { setAppError } from '../../../actions/app-actions';

class Form extends React.Component {

  constructor(props) {
    super(props);

    this.closeErrorBox = this.closeErrorBox.bind(this);
    this.submit = this.submit.bind(this);
  }

  closeErrorBox() {
    this.props.setAppError("");
  }

  submit(e) {

    $(".submit-buttons button").html($(".submit-buttons button").html() + "...");
    $(".submit-buttons .btn").prop('disabled', true);
    $(".submit-buttons .btn").addClass('disabled');


    this.props.onSubmit(e);
  }

  render() {
    const { showSuccessBox } = this.props;
    const { errorMessage } = this.props;

    if (errorMessage != undefined && errorMessage !== "") {
      return (
        <ErrorBox title={this.props.errorTitle} description={this.props.errorDescription}
          errorMessage={errorMessage} onClose={this.closeErrorBox} />
      );
    }
    else if (showSuccessBox) {
      return (
        <SuccessfulBox title={this.props.successTitle} link={this.props.successLink} onClick={this.props.successOnClick}
          description={this.props.successDescription} />
      );
    }
    else {
      return (

        <div className="box box-primary">
          {this.props.formTitle &&
            <div className="box-header with-border">
              <h3 className="box-title">{this.props.formTitle}</h3>
            </div>
          }
          <form role="form" onSubmit={this.submit}>
            <div className="box-body">
              {this.props.formMapping.map((formMap, i) =>
                this.props.isUpdate || formMap.onlyUpdate === undefined || formMap.onlyUpdate === false ?
                  <FormInput key={formMap.name} formMap={formMap} formData={this.props.formData} /> : null)}
            </div>
            <div className="box-footer submit-buttons">
              <button type="submit" className="btn btn-primary pull-right">{this.props.submitButtonLabel}</button>
              {this.props.cancelLink != undefined ?
                <Link style={{ margin: '0 10px 0 0' }} className="btn btn-primary pull-right" to={this.props.cancelLink}>Cancel</Link>
                :
                this.props.cancelOnClick != undefined ?
                  <div style={{ margin: '0 10px 0 0' }} className="btn btn-primary pull-right" onClick={this.props.cancelOnClick} >Cancel</div>
                  : null
              }
            </div>
          </form>
        </div>
      )
    }
  }
}

Form.propTypes = {
  formMapping: PropTypes.array,
  formData: PropTypes.object,
  formTitle: PropTypes.string,
  onSubmit: PropTypes.func,
  submitButtonLabel: PropTypes.string,
  successTitle: PropTypes.string,
  successDescription: PropTypes.string,
  successLink: PropTypes.string,
  successOnClick: PropTypes.func,
  showSuccessBox: PropTypes.bool,
  errorTitle: PropTypes.string,
  errorDescription: PropTypes.string,
  errorMessage: PropTypes.string,
  isUpdate: PropTypes.bool,
  cancelLink: PropTypes.string,
  cancelOnClick: PropTypes.func
}

function mapStateToProps(state) {
  return {
    errorMessage: state.appReducer.error
  };
}

export default connect(mapStateToProps, { setAppError: setAppError })(Form);