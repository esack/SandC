import { getHeaders, getFetch } from './api';

class ClientAPI {
  static getClients(projectID) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/Client/Project/' + projectID, {
      method: 'GET',
      headers: getHeaders()
    }));
  }

  static getClient(userID) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/Client/' + userID, {
      method: 'GET',
      headers: getHeaders()
    }));
  }

  static createClient(client) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/Client', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(client)
    }));
  }

  static updateClient(userID, client) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/Client/' + userID, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(client)
    }));
  }

  static loadSupplierClients(token) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/Client/Supplier/' + token, {
      method: 'GET'
    }));
  }
}

export default ClientAPI; 
