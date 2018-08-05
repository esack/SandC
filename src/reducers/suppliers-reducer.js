import { SUPPLIERS_LOADED, SUPPLIERS_ADD_CREATED, SUPPLIERS_SET_UPDATED } from '../actions/action-types';

const initialState = [];

export const suppliersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUPPLIERS_LOADED:
      return action.payload;
    case SUPPLIERS_ADD_CREATED:
      return [
        ...state,
        action.payload
      ];
    case SUPPLIERS_SET_UPDATED:
      return [
        ...state.filter(supplier => supplier.supplier_id !== action.payload.supplier_id),
        Object.assign({}, action.payload)
      ];
    default:
      return state;
  }
};