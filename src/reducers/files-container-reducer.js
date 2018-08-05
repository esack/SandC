import { FILES_CONTAINER_LOADED, FILES_CONTAINER_ADD_CREATED, FILES_CONTAINER_SET_UPDATED, FILES_ADD_CREATED, FILES_CONTAINER_SET_DELETED } from '../actions/action-types';

const initialState = [];

export const filesContainerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILES_CONTAINER_LOADED:
      return action.payload;
    case FILES_CONTAINER_ADD_CREATED:
      if (!action.payload.user_id || action.payload.user_id === 0) {
        return [...state, action.payload];
      }

      return [
        ...state.filter(fileContainer => fileContainer.file_type_id !== action.payload.file_type_id),
        Object.assign({}, action.payload)
      ];
    case FILES_CONTAINER_SET_UPDATED:
      return [
        ...state.filter(fileContainer => fileContainer.files_container_id !== action.payload.files_container_id),
        Object.assign({}, action.payload)
      ];
    case FILES_CONTAINER_SET_DELETED:
      if (!action.payload.user_id || action.payload.user_id === 0) {
        return state.filter(fileContainer => fileContainer.files_container_id !== action.payload.files_container_id);
      }
      const filesContainerId = action.payload.files_container_id;
      const userFilesContainer = Object.assign({}, action.payload)
      userFilesContainer.files_container_id = 0;

      return [
        ...state.filter(fileContainer => fileContainer.files_container_id !== filesContainerId),
        Object.assign({}, userFilesContainer)
      ];
    case FILES_ADD_CREATED:
      let fileContainer = Object.assign({}, state.filter(file => file.files_container_id === action.payload.files_container_id))[0];

      fileContainer.file_download_link = action.payload.file_download_link;
      fileContainer.file_download_content_type = action.payload.content_type;
      fileContainer.latest_file_id = action.payload.file_id;
      fileContainer.latest_file_content_type = action.payload.content_type;
      fileContainer.approved_file_id = null;
      fileContainer.approved_file_content_type = '';
      
      return [
        ...state.filter(fileContainer => fileContainer.files_container_id !== action.payload.files_container_id),
        Object.assign({}, fileContainer)
      ];
    default:
      return state;
  }
};
