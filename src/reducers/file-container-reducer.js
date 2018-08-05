import { fileContainerInitialState } from '../actions/initial-state';
import {
  FILE_CONTAINER_LOADED,
  FILE_CONTAINER_CREATED,
  FILE_CONTAINER_UPDATED,
  FILE_CONTAINER_RESET,
  FILES_LOADED,
  FILES_ADD_CREATED,
  FILES_SET_DELETED
} from '../actions/action-types';

export const fileContainerReducer = (state = fileContainerInitialState, action) => {
  switch (action.type) {
    case FILE_CONTAINER_LOADED:
    case FILE_CONTAINER_CREATED:
    case FILE_CONTAINER_UPDATED:
      return {
        ...state,
        file_container: action.payload
      };
    case FILE_CONTAINER_RESET:
      return  action.payload;
    case FILES_LOADED:
      return {
        ...state,
        files: action.payload
      };
    case FILES_ADD_CREATED:
      return {
        ...state,
        files: [...state.files, action.payload]
      };
    case FILES_SET_DELETED:
      return {
        ...state,
        files: [
          ...state.files.filter(file => file.file_id !== action.payload)
        ]
      };
    default:
      return state;
  }
};
