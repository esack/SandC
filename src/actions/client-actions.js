import { clientInitialState } from './initial-state';
import {
  CLIENTS_LOADED,
  CLIENT_LOADED,
  CLIENT_CREATED,
  CLIENT_UPDATED,
  CLIENTS_ADD_CREATED,
  CLIENTS_SET_UPDATED,
  SET_APP_ERROR,
  CLIENT_RESET,
  CLIENTS_SUPPLIER_LOADED
} from './action-types';

import ClientAPI from '../api/client-api';
import { debug } from 'util';

export function loadClients(projectID) {
  return function (dispatch) {
    return ClientAPI.getClients(projectID).then(response => {
      dispatch({ type: CLIENTS_LOADED, payload: response.clients });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " +  error.Message});
      });
      throw (response);
    });
  };
}

export function loadClient(userID) {
  return function (dispatch) {
    return ClientAPI.getClient(userID).then(response => {
      dispatch({ type: CLIENT_LOADED, payload: response.client });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " +  error.Message});
      });
      throw (response);
    });
  };
}

export function createClient(client) {
  return function (dispatch) {
    return ClientAPI.createClient(client).then(response => {
      dispatch({ type: CLIENT_CREATED, payload: response.client });
      dispatch({ type: CLIENTS_ADD_CREATED, payload: response.client });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " +  error.Message});
      });
      throw (response);
    });
  };
}

export function updateClient(id, client) {
  return function (dispatch) {
    return ClientAPI.updateClient(id, client).then(response => {
      dispatch({ type: CLIENT_UPDATED, payload: response.client });
      dispatch({ type: CLIENTS_SET_UPDATED, payload: response.client });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " +  error.Message});
      });
      throw (response);
    });
  };
}

export function setClientReset() {
  return { type: CLIENT_RESET, payload: clientInitialState };
}

export function loadSupplierClients(token) {
  return function (dispatch) {
    return ClientAPI.loadSupplierClients(token).then((response) => {
      dispatch({ type: CLIENTS_SUPPLIER_LOADED, payload: response.info });
    });
  };
}
