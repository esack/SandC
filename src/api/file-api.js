import { getHeaders, getFetch, getAuthorizationHeaders } from './api';

class FileAPI {
  static getFileContainersByProject(projectID) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/File/Project/' + projectID, {
      method: 'GET',
      headers: getHeaders()
    }));
  }

  static getFileContainersByClient(userID) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/File/Client/' + userID, {
      method: 'GET',
      headers: getHeaders()
    }));
  }

  static getFileContainer(fileContainerID) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/File/Container/' + fileContainerID, {
      method: 'GET',
      headers: getHeaders()
    }));
  }

  static createFileTypes(fileType) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/File/Types', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(fileType)
    }));
  }

  static getFileTypes() {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/File/Types', {
      method: 'GET',
      headers: getHeaders()
    }));
  }

  static createFileContainer(fileContainer, token) {
    debugger;
    if (!token) {
      return getFetch(new Request(CONFIG.API_BASE_URL + 'api/File/Container', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(fileContainer)
      }));
    }

    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/File/Container/Supplier/' + token, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(fileContainer)
    }));
  }

  static updateFileContainer(fileContainerID, fileContainer) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/File/Container/' + fileContainerID, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(fileContainer)
    }));
  }

  static deleteFileContainer(fileContainerID) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/File/Container/' + fileContainerID, {
      method: 'DELETE',
      headers: getHeaders()
    }));
  }

  static getFiles(fileContainerID) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/File/Container/' + fileContainerID + '/GetFiles' , {
      method: 'GET',
      headers: getHeaders()
    }));
  }

  static createFile(file, token) {
    const formData = new FormData();
    formData.append('file', file.file);
    formData.append('version_description', file.version_description);
    formData.append('file_date', file.file_date);
    formData.append('edition', file.edition);

    if (!token) {
      return getFetch(new Request(CONFIG.API_BASE_URL + 'api/File/' + file.files_container_id, {
        method: 'POST',
        headers: getAuthorizationHeaders(),
        body: formData
      }));
    }

    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/File/Supplier/' + file.files_container_id + '/' + token, {
      method: 'POST',
      body: formData
    }));
  }

  static deleteFile(fileID) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/File/' + fileID, {
      method: 'DELETE',
      headers: getHeaders()
    }));
  }
}

export default FileAPI; 
