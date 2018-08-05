import { USERS_LOADED, USERS_ADD_CREATED, USERS_SET_UPDATED } from '../actions/action-types';

const initialState = [];

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_LOADED:
      return action.payload;
    case USERS_ADD_CREATED:
      return [
        ...state,
        action.payload
      ];
    case USERS_SET_UPDATED:
      return [
        ...state.filter(user => user.user_id !== action.payload.user_id),
        Object.assign({}, action.payload)
      ];
    default:
      return state;
  }
};