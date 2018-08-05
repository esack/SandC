import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAppTitle, setAppDescrition } from '../../actions/app-actions';
import { loadSupplierClients } from '../../actions/client-actions';
import { sendSupplierURLWithToken } from '../../actions/supplier-actions';

import LinkBoxes from '../common/links/link-boxes';

class ProjectClientView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      clients_loading: true
    };

    this.sendEmialLink = this.sendEmialLink.bind(this);
  }

  componentDidMount() {
    this.props.loadSupplierClients(this.props.params.token)
    .then(() => {
      this.setState({ clients_loading: false });
    }).catch((err) => {
      this.setState({ clients_loading: false });
      this.setState({ message: 'The link has expired click the button above to get a new link sent to your email.' });      
    });
  }

  sendEmialLink() {
    this.props.sendSupplierURLWithToken(this.props.params.token).then(() => {
      this.setState({ message: 'An email was sent with a new link.' });      
    });  
    this.setState({ message: 'Sending...' });      
  }

  render() {
    return (
      <div>
        <div>Project {this.props.projectName}</div>
        <LinkBoxes title="Clients" loadnig={this.state.clients_loading} showButtons={this.state.message !== ''}
          onClick={this.sendEmialLink} buttonTitle="Send new access link"
          noBoxLinksMessage={this.state.message} boxLinks={this.props.clients} />
      </div>
    );
  }
}

ProjectClientView.propTypes = {
  projectName: PropTypes.string,
  clients: PropTypes.array.isRequired,
  params: PropTypes.object,
  loadSupplierClients: PropTypes.func,
  sendSupplierURLWithToken: PropTypes.func
};

function mapStateToProps(state, ownProps) {
  const clientBoxLinks = [];

  const clientsSuppliers = state.clientsSupplierReducer.clients.sort(function (o1, o2) {
    return o1.user_id < o2.user_id ? -1 : 1;
  });

  clientsSuppliers.forEach((clientsSupplier) => {
    clientBoxLinks.push({
      name: clientsSupplier.name,
      description: '',      
      fileContainer: clientsSupplier.file_container,
      token: ownProps.params.token,
      icon: 'fa-file-o'
    });
  });

  return {
    projectName: state.clientsSupplierReducer.project_name,
    clients: clientBoxLinks
  };
}

export default connect(mapStateToProps,
  {
    setAppTitle,
    setAppDescrition,
    loadSupplierClients,
    sendSupplierURLWithToken
  })(ProjectClientView);
