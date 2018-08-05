import { getHeaders, getFetch } from './api';

class SupplierAPI {
  static getSuppliers(projectID) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/Supplier/Project/' + projectID, {
      method: 'GET',
      headers: getHeaders()
    }));
  }

  static getSupplier(supplierID) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/Supplier/' + supplierID, {
      method: 'GET',
      headers: getHeaders()
    }));
  }

  static createSupplier(supplier) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/Supplier', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(supplier)
    }));
  }

  static updateSupplier(supplierID, supplier) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/Supplier/' + supplierID, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(supplier)
    }));
  }

  static getContacts(supplierID) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/Supplier/Contacts/' + supplierID, {
      method: 'GET',
      headers: getHeaders()
    }));
  }

  static getContact(contactID) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/Supplier/Contact/' + contactID, {
      method: 'GET',
      headers: getHeaders()
    }));
  }

  static createContact(contact) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/Supplier/Contact', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(contact)
    }));
  }

  static updateContact(contactID, contact) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/Supplier/Contact/' + contactID, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(contact)
    }));
  }

  static sendSupplierURL(contactID, fileTypeId) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/Supplier/Token/' + contactID + '/' + fileTypeId, {
      method: 'GET',
      headers: getHeaders()
    }));
  }

  static sendSupplierURLWithToken(token) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/Supplier/Token/' + token, {
      method: 'GET'
    }));
  }
}

export default SupplierAPI; 
