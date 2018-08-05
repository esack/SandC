import { CLIENTS_LOADED, CLIENTS_ADD_CREATED, CLIENTS_SET_UPDATED, PROJECTS_CLIENT_STATUSES_UPDATED } from '../actions/action-types';

const initialState = [];

export const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLIENTS_LOADED:
      return action.payload;
    case CLIENTS_ADD_CREATED:
      return [
        ...state,
        action.payload
      ];
    case CLIENTS_SET_UPDATED:
      return [
        ...state.filter(client => client.client_id !== action.payload.client_id),
        Object.assign({}, action.payload)
      ];
    case PROJECTS_CLIENT_STATUSES_UPDATED:
      return {
        ...state,
        client: {
          ...state.client,
          status_color: state.client.status_id === action.payload.status_id ? 
            action.payload.status_color : state.client.status_color
        }
      };
    default:
      return state;
  }
};
