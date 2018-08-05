import { userInitialState } from '../actions/initial-state'
import { USER_LOADED, USER_CREATED, USER_UPDATED, USER_RESET } from '../actions/action-types';

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case USER_LOADED:
    case USER_CREATED:
    case USER_UPDATED:
    case USER_RESET:
      return action.payload
    default:
      return state;
  }
};