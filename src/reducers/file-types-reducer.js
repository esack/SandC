import {
  FILE_TYPES_LOADED
} from '../actions/action-types';

const fileTypesInitialState = [];

export const fileTypesReducer = (state = fileTypesInitialState, action) => {
  switch (action.type) {
    case FILE_TYPES_LOADED:
      return action.payload;
    default:
      return state;
  }
};