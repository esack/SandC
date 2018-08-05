import { getHeaders, getFetch } from './api';

class UserAPI {
  static getUsers() {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/User', {
      method: 'GET',
      headers: getHeaders()
    }));
  }

  static getUser(userID) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/User/' + userID, {
      method: 'GET',
      headers: getHeaders()
    }));
  }

  static loadUserByEmail(email) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/User/Email', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email })
    }));
  }

  static createUser(user) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/User', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(user)
    }));
  }

  static updateUser(userID, user) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/User/' + userID, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(user)
    }));
  }

  static login(email, password) {
    const request = new Request(CONFIG.API_BASE_URL + 'token', {
      method: 'POST',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache'
      }),
      body: 'grant_type=password&username=' + email + '&password=' + password
    });

    return fetch(request).then(response => {
      if (!response.ok) {
        throw (response);
      }

      return response.json();
    });
  }

  static register(auth_user) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/AuthUser/Register', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(auth_user)
    }));
  }

  static passwordReset(email) {
    return getFetch(new Request(CONFIG.API_BASE_URL + 'api/User/ResetPassword', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({ email })
    }));
  }
}

export default UserAPI; 