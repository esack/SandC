import { projectInitialState } from '../actions/initial-state'
import { 
  PROJECT_LOADED, 
  PROJECT_CREATED, 
  PROJECT_UPDATED, 
  PROJECT_RESET, 
  PROJECTS_CLIENT_STATUSES_CREATED,
  PROJECTS_CLIENT_STATUSES_UPDATED
} from '../actions/action-types';

export const projectReducer = (state = projectInitialState, action) => {
  switch (action.type) {
    case PROJECT_LOADED:
    case PROJECT_CREATED:
    case PROJECT_UPDATED:
    case PROJECT_RESET:
      return action.payload;
    case PROJECTS_CLIENT_STATUSES_CREATED:
      return {
        ...state,
        project_client_statuses: [
          ...state.project_client_statuses,
          action.payload
        ] 
      }; 
    case PROJECTS_CLIENT_STATUSES_UPDATED:
      return {
        ...state,
        project_client_statuses: [
          ...state.project_client_statuses.filter(project_client_status => project_client_status.status_id !== action.payload.status_id),
          Object.assign({}, action.payload)
        ]
      }; 
    default:
      return state;
  }
};