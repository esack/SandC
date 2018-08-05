import { clientInitialState } from '../actions/initial-state'
import { CLIENT_LOADED, CLIENT_CREATED, CLIENT_UPDATED, CLIENT_RESET } from '../actions/action-types';

export const clientReducer = (state = clientInitialState, action) => {
  switch (action.type) {
    case CLIENT_LOADED:
    case CLIENT_CREATED:
    case CLIENT_UPDATED:
    case CLIENT_RESET:
      return action.payload;
    default:
      return state;
  }
};
