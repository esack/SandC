import { fileInitialState } from '../actions/initial-state';
import { FILE_RESET } from '../actions/action-types';

export const fileReducer = (state = fileInitialState, action) => {
  switch (action.type) {
    case FILE_RESET:
      return action.payload;
    default:
      return state;
  }
};
