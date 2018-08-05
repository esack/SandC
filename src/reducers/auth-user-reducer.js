import { authUserInitialState } from '../actions/initial-state'
import { USER_LOGIN } from '../actions/action-types';

export const authUserReducer = (state = authUserInitialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return action.payload
    default:
      return state;
  }
};