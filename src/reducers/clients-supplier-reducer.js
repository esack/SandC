import { clientsSupplierInitialState } from '../actions/initial-state';
import { CLIENTS_SUPPLIER_LOADED, CLIENTS_SUPPLIER_FILE_CREATED } from '../actions/action-types';

export const clientsSupplierReducer = (state = clientsSupplierInitialState, action) => {
  switch (action.type) {
    case CLIENTS_SUPPLIER_LOADED:
      return action.payload;
    case CLIENTS_SUPPLIER_FILE_CREATED:
      const clientUpdate = Object.assign({}, state.clients.filter(client => client.user_id === action.payload.user_id))[0];

      clientUpdate.file_container = action.payload;
      return {
        ...state,
        clients: [
          ...state.clients.filter(client => client.user_id !== action.payload.user_id),
          Object.assign({}, clientUpdate)
        ]
      };
    default:
      return state;
  }
};
