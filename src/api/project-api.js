import { getHeaders, getFetch, getAuthorizationHeaders } from './api';

class ProjectAPI {
  static getAllProjects() {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/Project', {
      method: 'GET',
      headers: getHeaders()
    }));
  }

  static getProject(projectID) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/Project/' + projectID, {
      method: 'GET',
      headers: getHeaders()
    }));
  }

  static createProject(project) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/Project', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(project)
    }));
  }

  static updateProject(projectID, project) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/Project/' + projectID, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(project)
    }));
  }

  static createProjectClientStatus(projectClientStatus) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/Project/ProjectClientStatus', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(projectClientStatus)
    }));
  }

  static updateProjectClientStatus(statusID, projectClientStatus) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/Project/ProjectClientStatus/' + statusID, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(projectClientStatus)
    }));
  }

  static uploadClients(projectID, file){
    
    console.log(file)
    var formData = new FormData();
    formData.append('file', file);
    
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/Project/UploadClients/' + projectID , {
      method: 'POST',
      headers: getAuthorizationHeaders(),      
      body: formData
    }));
  }
}

export default ProjectAPI; 