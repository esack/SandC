import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAppTitle, setAppDescrition } from '../../actions/app-actions';
import { loadProjects } from '../../actions/project-actions';
import { Link } from 'react-router';
import LinkBox from '../common/links/link-box';

class ProjectsView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.setAppTitle("S & C Projects");
        this.props.setAppDescrition("");
        this.props.loadProjects();
    }

    render() {
        return (
            <div>
                {this.props.authUserReducer.role == "ADMIN" ?
                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <Link className="btn  btn-info btn-flat pull-left" to="/project/add">Add a new project</Link>
                            <br />
                            <br />
                        </div>
                    </div>
                    : null}
                <div className="row">
                    {this.props.projects.length > 0 ? this.props.projects.map((project, i) =>
                        <LinkBox key={i} name={project.project_name} description={project.description}
                            link={'/projects/' + project.project_id} icon="fa-building" />) : null}
                </div>
            </div>
        )
    };
}

ProjectsView.propTypes = {
    projects: PropTypes.array.isRequired,
    authUserReducer: PropTypes.object.isRequired,
    setAppTitle: PropTypes.func.isRequired,
    loadProjects: PropTypes.func.isRequired,
    setAppDescrition: PropTypes.func.isRequired

}

function mapStateToProps(state) {
    return {
        projects: state.projectsReducer,
        authUserReducer: state.authUserReducer
    };
}

export default connect(mapStateToProps, { setAppTitle, setAppDescrition, loadProjects })(ProjectsView);