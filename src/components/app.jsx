import React from 'react';
import PDFViewer from 'mgr-pdf-viewer-react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAuthUser, getSavedAuthUser } from '../actions/user-actions';
import { toggleModal } from '../actions/app-actions';
import DropdownMenu from './common/dropdown-menu.jsx';
import NavLeft from './nav-left.jsx';
import Login from './login';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      logged_in: false
    };

    this.logout = this.logout.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    const authUser = getSavedAuthUser();

    if (authUser != undefined || this.props.location.pathname.indexOf('projects/clients/') > -1) {
      $("body").addClass("skin-blue");
      $("body").addClass("sidebar-mini");

      this.props.setAuthUser(authUser);
      this.setState({ logged_in: true });
    } else {
      $("body").addClass("login-page");
      this.setState({ logged_in: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.authUserReducer && nextProps.authUserReducer.access_token !== '') ||
      this.props.location.pathname.indexOf('projects/clients/') > -1) {
      this.setState({ logged_in: true });

      if ($(".login-page")[0]) {
        $("body").removeClass("login-page");
        $("body").addClass("skin-blue");
        $("body").addClass("sidebar-mini");
      }
    }
  }

  logout() {
    localStorage.removeItem("auth_user")
    this.setState({ logged_in: false });

    $("body").addClass("login-page");
    $("body").removeClass("skin-blue");
    $("body").removeClass("sidebar-mini");
  }

  closeModal() {
    this.props.toggleModal(false);
  }

  render() {
    if (this.state.logged_in) {
      return (
        <div>
          <div className="modal" style={{ display: this.props.show_modal ? 'block' : '' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                    <span aria-hidden="true">×</span></button>
                  <h4 className="modal-title">File viewer</h4>
                </div>
                <div className="modal-body">
                  {this.props.pdf_viewer_url && <PDFViewer document={{ url: this.props.pdf_viewer_url }} />}
                </div>
              </div>
            </div>
          </div>
          <header className="main-header">
            <Link to="/" href="index2.html" className="logo">
              <span className="logo-mini">S & C</span>
              <span className="logo-lg">S & C Design</span>
            </Link>
            <nav className="navbar navbar-static-top" role="navigation">
              <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                <span className="sr-only">Toggle navigation</span>
              </a>
              {this.props.authUserReducer &&
                <div className="navbar-custom-menu">
                  <ul className="nav navbar-nav">
                    <DropdownMenu messageCount="0" />
                    <li className="dropdown user user-menu">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                        <span className="hidden-xs">{this.props.authUserReducer.name}</span>
                      </a>
                      <ul className="dropdown-menu">
                        <li className="user-header">
                          <p>
                            {this.props.authUserReducer.name}
                          </p>
                        </li>
                        <li className="user-footer">
                          <div className="pull-left">
                            <Link to={"/admin/users/view/" + this.props.authUserReducer.user_id} className="btn btn-default btn-flat">Profile</Link>
                          </div>
                          <div className="pull-right">
                            <button onClick={this.logout} className="btn btn-default btn-flat">Sign out</button>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              }

            </nav>
          </header>
          <NavLeft />
          <div className="content-wrapper">
            <section className="content-header">
              <h1>
                {this.props.pageHeader}
                <small>{this.props.description}</small>
              </h1>
            </section>

            <section className="content">
              {this.props.children}
            </section>
          </div>
          <footer className="main-footer">
            <strong>Copyright &copy; 2017 S & C.</strong> All rights reserved.
                    </footer>
          <div className="control-sidebar-bg"></div>
        </div>
      );
    }
    else {
      return (
        <Login />
      );
    }
  }
}

App.propTypes = {
  pageHeader: PropTypes.string.isRequired,
  children: PropTypes.object,
  authUserReducer: PropTypes.object,
  description: PropTypes.string,
  setAuthUser: PropTypes.func.isRequired,
  show_modal: PropTypes.bool,
  pdf_viewer_url: PropTypes.string,
  toggleModal: PropTypes.func,
  location: PropTypes.object
};

function mapStateToProps(state) {
  return {
    pageHeader: state.appReducer.title,
    description: state.appReducer.description,
    authUserReducer: state.authUserReducer,
    show_modal: state.appReducer.show_modal,
    pdf_viewer_url: state.appReducer.pdf_viewer_url
  };
}

export default connect(mapStateToProps, { setAuthUser, toggleModal })(App);
