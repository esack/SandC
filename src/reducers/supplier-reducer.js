import { supplierInitialState } from '../actions/initial-state'
import {
  SUPPLIER_LOADED,
  SUPPLIER_CREATED,
  SUPPLIER_UPDATED,
  SUPPLIER_RESET,
  CONTACTS_LOADED,
  CONTACTS_ADD_CREATED,
  CONTACTS_SET_UPDATED
} from '../actions/action-types';

export const supplierReducer = (state = supplierInitialState, action) => {
  switch (action.type) {
    case SUPPLIER_LOADED:
    case SUPPLIER_CREATED:
    case SUPPLIER_UPDATED:
    case SUPPLIER_RESET:
      return {
        ...state,
        supplier_data: action.payload
      };
    case CONTACTS_LOADED:
      return {
        ...state,
        contacts: action.payload
      };
    case CONTACTS_ADD_CREATED:
      return {
        ...state,
        contacts: [
          ...state.contacts,
          action.payload
        ]
      };
    case CONTACTS_SET_UPDATED:
      return {
        ...state,
        contacts: [
          ...state.contacts.filter(contact => contact.contact_id !== action.payload.contact_id),
          Object.assign({}, action.payload)
        ]
      };
    default:
      return state;
  }
};