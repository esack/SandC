import { contactInitialState } from '../actions/initial-state'
import { CONTACT_LOADED, CONTACT_CREATED, CONTACT_UPDATED, CONTACT_RESET } from '../actions/action-types';

export const contactReducer = (state = contactInitialState, action) => {
  switch (action.type) {
    case CONTACT_LOADED:
    case CONTACT_CREATED:
    case CONTACT_UPDATED:
    case CONTACT_RESET:
      return action.payload
    default:
      return state;
  }
};