import { PROJECTS_LOADED, PROJECTS_ADD_CREATED, PROJECTS_SET_UPDATED } from '../actions/action-types';

const initialState = [];

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROJECTS_LOADED:
      return action.payload
    case PROJECTS_ADD_CREATED:
      return [
        ...state,
        action.payload
      ];
    case PROJECTS_SET_UPDATED:
      return [
        ...state.filter(project => project.project_id !== action.payload.project_id),
        Object.assign({}, action.payload)
      ];
    default:
      return state;
  }
};