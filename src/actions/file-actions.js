import { fileContainerInitialState, fileInitialState } from './initial-state'
import {
  FILES_CONTAINER_LOADED,
  FILE_CONTAINER_LOADED,
  FILE_CONTAINER_CREATED,
  FILE_CONTAINER_UPDATED,
  FILES_CONTAINER_ADD_CREATED,
  FILES_CONTAINER_SET_UPDATED,
  FILES_CONTAINER_SET_DELETED,
  FILES_ADD_CREATED,
  FILES_SET_DELETED,
  FILES_LOADED,
  FILE_RESET,
  SET_APP_ERROR,
  FILE_CONTAINER_RESET,
  FILE_TYPES_LOADED,
  CLIENTS_SUPPLIER_FILE_CREATED
} from './action-types';

import FileAPI from '../api/file-api';

export function loadFileContainersByProject(projectID) {
  return function (dispatch) {
    return FileAPI.getFileContainersByProject(projectID).then(response => {
      dispatch({ type: FILES_CONTAINER_LOADED, payload: response.file_containers });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " + error.Message });
      });
      throw (response);
    });
  };
}

export function loadFileContainersByClient(userID) {
  return function (dispatch) {
    return FileAPI.getFileContainersByClient(userID).then(response => {
      dispatch({ type: FILES_CONTAINER_LOADED, payload: response.file_containers });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " + error.Message });
      });
      throw (response);
    });
  };
}

export function loadFileContainer(fileContainerID) {
  return function (dispatch) {
    return FileAPI.getFileContainer(fileContainerID).then(response => {
      dispatch({ type: FILE_CONTAINER_LOADED, payload: response.file_container });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " + error.Message });
      });
      throw (response);
    });
  };
}

export function loadFileTypes() {
  return function (dispatch) {
    return FileAPI.getFileTypes().then(response => {
      dispatch({ type: FILE_TYPES_LOADED, payload: response.file_types });
    }).catch(response => {
      console.log(response)
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " + error.Message });
      });
      throw (response);
    });
  };
}

export function createFileTypes(fileType) {
  return function (dispatch) {
    return FileAPI.createFileTypes(fileType).then(response => {
      loadFileTypes();
      return response;
    }).catch(response => {
      console.log(response)
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " + error.Message });
      });
      throw (response);
    });
  };
}

export function createFileContainer(fileContainer, token) {
  return function (dispatch) {
    return FileAPI.createFileContainer(fileContainer, token).then(response => {
      dispatch({ type: FILE_CONTAINER_CREATED, payload: response.file_container });
      dispatch({ type: FILES_CONTAINER_ADD_CREATED, payload: response.file_container });

      return response;
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " + error.Message });
      });
      throw (response);
    });
  };
}

export function updateFileContainer(fileContainerID, fileContainer) {
  return function (dispatch) {
    return FileAPI.updateFileContainer(fileContainerID, fileContainer).then(response => {
      dispatch({ type: FILE_CONTAINER_UPDATED, payload: response.file_container });
      dispatch({ type: FILES_CONTAINER_SET_UPDATED, payload: response.file_container });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " + error.Message });
      });
      throw (response);
    });
  };
}

export function deleteFileContainer(fileContainerID) {
  return function (dispatch) {
    return FileAPI.deleteFileContainer(fileContainerID).then(response => {
      dispatch({ type: FILES_CONTAINER_SET_DELETED, payload: response.files_container });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " + error.Message });
      });
      throw (response);
    });
  };
}


export function setFileContainerReset() {
  return { type: FILE_CONTAINER_RESET, payload: fileContainerInitialState };
}

export function loadFiles(fileContainerID) {
  return function (dispatch) {
    return FileAPI.getFiles(fileContainerID).then(response => {
      dispatch({ type: FILES_LOADED, payload: response.files });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " + error.Message });
      });
      throw (response);
    });
  };
}

export function createFile(file, token) {
  return function (dispatch) {
    return FileAPI.createFile(file, token).then(response => {
      if (!token) {
        dispatch({ type: FILES_ADD_CREATED, payload: response.file });
        dispatch({ type: FILE_RESET, payload: fileInitialState });
      } else {
        dispatch({ type: CLIENTS_SUPPLIER_FILE_CREATED, payload: response.file_container });
      }
    }).catch((response) => {
      if (response.json) {
        response.json().then((error) => {
          dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " + error.Message });
        });
      }

      dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " + error.Message });
      
      throw (response);
    });
  };
}

export function deleteFile(fileId) {
  return function (dispatch) {
    return FileAPI.deleteFile(fileId).then(response => {
      dispatch({ type: FILES_SET_DELETED, payload: fileId });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " + error.Message });
      });
      throw (response);
    });
  };
}