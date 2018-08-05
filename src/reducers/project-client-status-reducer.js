import { projectClientStatusInitialState } from '../actions/initial-state'
import { PROJECT_CLIENT_STATUSES_RESET } from '../actions/action-types';

export const projectClientStatusReducer = (state = projectClientStatusInitialState, action) => {
  switch (action.type) {
    case PROJECT_CLIENT_STATUSES_RESET:
      console.log(action.payload)
      return action.payload
    default:
      return state;
  }
};