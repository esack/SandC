import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class NavLeft extends React.Component {
  constructor() {
    super();
    this.state = {
      active_nav: ""
    }
  }

  componentWillMount() {
    var _this = this;

    browserHistory.listen(location => {
      if (location.hash.indexOf("#/admin") !== -1) {
        this.setState({ active_nav: "ADMIN" });
      }
      else if (location.hash.indexOf("#/projects") !== -1) {
        this.setState({ active_nav: "PROJECTS" });
      }
    });
  }

  render() {

    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <form action="#" method="get" className="sidebar-form">
            <div className="input-group">
              <input type="text" name="q" className="form-control" placeholder="Search..." />
              <span className="input-group-btn">
                <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </form>
          {this.props.authUserReducer &&
            <ul className="sidebar-menu">
              <li className="header">SITE NAVIGATION</li>
              {this.props.authUserReducer.role == "ADMIN" ? <li className={this.state.active_nav === "ADMIN" ? "active" : ""}><Link to="/admin"><i className="fa fa-link"></i> <span>Admin</span></Link></li> : null}
              <li className={this.state.active_nav === "PROJECTS" ? "active" : ""}><Link to="/projects"><i className="fa fa-link"></i> <span>Projects</span></Link></li>
            </ul>
          }

        </section>
      </aside>
    );
  }
}

NavLeft.propTypes = {
  authUserReducer: PropTypes.object
}

function mapStateToProps(state) {
  return {
    authUserReducer: state.authUserReducer
  };
}

export default connect(mapStateToProps)(NavLeft);