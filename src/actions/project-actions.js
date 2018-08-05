import { projectInitialState, projectClientStatusInitialState } from './initial-state'
import {
  PROJECTS_LOADED,
  PROJECTS_ADD_CREATED,
  PROJECTS_SET_UPDATED,
  PROJECT_LOADED,
  PROJECT_CREATED,
  PROJECT_UPDATED,
  SET_APP_ERROR,
  PROJECT_RESET,
  PROJECT_CLIENT_STATUSES_RESET,
  PROJECTS_CLIENT_STATUSES_CREATED,
  PROJECTS_CLIENT_STATUSES_UPDATED
} from './action-types';
import ProjectAPI from '../api/project-api';

export function loadProjects() {
  return function (dispatch) {
    return ProjectAPI.getAllProjects().then(response => {
      dispatch({ type: PROJECTS_LOADED, payload: response.projects });
    }).catch(response => {
      throw(response);
    });
  };
}

export function loadProject(id) {
  return function (dispatch) {
    return ProjectAPI.getProject(id).then(response => {
      dispatch({ type: PROJECT_LOADED, payload: response.project });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " +  error.Message});
      });
      throw(response);
    });
  };
}

export function createProject(project) {
  return function (dispatch) {
    return ProjectAPI.createProject(project).then(response => {
      dispatch({ type: PROJECT_CREATED, payload: response.project });
      dispatch({ type: PROJECTS_ADD_CREATED, payload: response.project });

      return response;
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " +  error.Message});
      });
      throw(response);
    });
  };
}

export function updateProject(id, project) {
  return function (dispatch) {
    return ProjectAPI.updateProject(id, project).then(response => {
      dispatch({ type: PROJECT_UPDATED, payload: response.project });
      dispatch({ type: PROJECTS_SET_UPDATED, payload: response.project });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " +  error.Message});
      });
      throw(response);
    });
  };
}

export function setProjectReset() {
  return { type: PROJECT_RESET, payload: projectInitialState };
}

export function loadProjectClientStatuses(id) {
  return function (dispatch) {
    return ProjectAPI.getProjectClientStatuses(id).then(response => {
      dispatch({ type: PROJECTS_CLIENT_STATUSES_LOADED, payload: response.project_client_statuses });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " +  error.Message});
      });
      throw(response);
    });
  };
}

export function createProjectClientStatus(projectClientStatus) {
  return function (dispatch) {
    return ProjectAPI.createProjectClientStatus(projectClientStatus).then(response => {
      dispatch({ type: PROJECTS_CLIENT_STATUSES_CREATED, payload: response.project_client_status });
      dispatch({ type: PROJECT_CLIENT_STATUSES_RESET, payload: projectClientStatusInitialState });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " +  error.Message});
      });
      throw(response);
    });
  };
}

export function updateProjectClientStatus(id, projectClientStatus) {
  return function (dispatch) {
    return ProjectAPI.updateProjectClientStatus(id, projectClientStatus).then(response => {
      dispatch({ type: PROJECTS_CLIENT_STATUSES_UPDATED, payload: response.project_client_status });
      dispatch({ type: PROJECT_CLIENT_STATUSES_RESET, payload: projectClientStatusInitialState });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " +  error.Message});
      });
      throw(response);
    });
  };
}

export function uploadClients(project_id, file) {
  return function (dispatch) {
    return ProjectAPI.uploadClients(project_id, file).then(response => {
      return response;
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " +  error.Message});
      });
      throw(response);
    });
  };
}

export function setProjectClientStatusReset() {
  return { type: PROJECT_CLIENT_STATUSES_RESET, payload: projectClientStatusInitialState };
}