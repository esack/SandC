import { supplierInitialState, contactInitialState } from './initial-state'
import {
  SUPPLIERS_LOADED,
  SUPPLIERS_ADD_CREATED,
  SUPPLIERS_SET_UPDATED,
  SUPPLIER_LOADED,
  SUPPLIER_CREATED,
  SUPPLIER_UPDATED,
  SET_APP_ERROR,
  SUPPLIER_RESET,
  CONTACTS_LOADED,
  CONTACTS_ADD_CREATED,
  CONTACTS_SET_UPDATED,
  CONTACT_LOADED,
  CONTACT_CREATED, 
  CONTACT_UPDATED,
  CONTACT_RESET
} from './action-types';
import SupplierAPI from '../api/supplier-api';

export function loadSuppliers(projectID) {
  return function (dispatch) {
    return SupplierAPI.getSuppliers(projectID).then(response => {
      dispatch({ type: SUPPLIERS_LOADED, payload: response.suppliers });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " +  error.Message});
      });
      throw(response);
    });
  };
}

export function loadSupplier(id) {
  return function (dispatch) {
    return SupplierAPI.getSupplier(id).then(response => {
      dispatch({ type: SUPPLIER_LOADED, payload: response.supplier });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " +  error.Message});
      });
      throw(response);
    });
  };
}

export function createSupplier(supplier) {
  return function (dispatch) {
    return SupplierAPI.createSupplier(supplier).then(response => {
      dispatch({ type: SUPPLIER_CREATED, payload: response.supplier });
      dispatch({ type: SUPPLIERS_ADD_CREATED, payload: response.supplier });

      return response;
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " +  error.Message});
      });
      throw(response);
    });
  };
}

export function updateSupplier(id, supplier) {
  return function (dispatch) {
    return SupplierAPI.updateSupplier(id, supplier).then(response => {
      dispatch({ type: SUPPLIER_UPDATED, payload: response.supplier });
      dispatch({ type: SUPPLIERS_SET_UPDATED, payload: response.supplier });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " +  error.Message});
      });
      throw(response);
    });
  };
}

export function setSupplierReset() {
  return { type: SUPPLIER_RESET, payload: supplierInitialState.supplier_data };
}

export function loadContacts(supplierID) {
  return function (dispatch) {
    return SupplierAPI.getContacts(supplierID).then(response => {
      dispatch({ type: CONTACTS_LOADED, payload: response.contacts });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " +  error.Message});
      });
      throw(response);
    });
  };
}

export function loadContact(contactID) {
  return function (dispatch) {
    return SupplierAPI.getContact(contactID).then(response => {
      dispatch({ type: CONTACT_LOADED, payload: response.contact });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " +  error.Message});
      });
      throw(response);
    });
  };
}

export function createContact(contact) {
  return function (dispatch) {
    return SupplierAPI.createContact(contact).then(response => {
      dispatch({ type: CONTACT_CREATED, payload: response.contact });
      dispatch({ type: CONTACTS_ADD_CREATED, payload: response.contact });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " +  error.Message});
      });
      throw(response);
    });
  };
}

export function updateContact(id, contact) {
  return function (dispatch) {
    return SupplierAPI.updateContact(id, contact).then(response => {
      dispatch({ type: CONTACT_UPDATED, payload: response.contact });
      dispatch({ type: CONTACTS_SET_UPDATED, payload: response.contact });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " +  error.Message});
      });
      throw(response);
    });
  };
}

export function sendSupplierURL(contactId, fileTypeId) {
  return function (dispatch) {
    return SupplierAPI.sendSupplierURL(contactId, fileTypeId).then((response) => {
      return response;
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " +  error.Message});
      });
      throw(response);
    });
  };
}

export function sendSupplierURLWithToken(token) {
  return function (dispatch) {
    return SupplierAPI.sendSupplierURLWithToken(token).then((response) => {
      return response;
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " +  error.Message});
      });
      throw(response);
    });
  };
}

export function setContactReset() {
  return { type: CONTACT_RESET, payload: contactInitialState };
}