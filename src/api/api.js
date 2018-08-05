import { getSavedAuthUser, removeAuthUser } from '../actions/user-actions';

export function getHeaders() {
  const authUser = getSavedAuthUser();

  if (authUser && authUser.access_token !== '') {
    return new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Authorization': `Bearer ${authUser.access_token}`
    });
  }

  return new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-cache'
  });
}

export function getAuthorizationHeaders() {
  const authUser = getSavedAuthUser();

  if (!authUser) {
    return null;
  }

  return new Headers({
    'Authorization': "Bearer " + authUser.access_token
  });
}

export function getTokenHeaders(token) {
  return new Headers({
    token
  });
}

export function getFetch(request) {
  return fetch(request).then((response) => {
    if (!response.ok) {
      const authUser = getSavedAuthUser();
      if (authUser && response.status === 401) {
        removeAuthUser();
        //window.location = '/';
      }
      throw (response);
    }

    let contentType = response.headers.get('Content-Type');

    if (contentType && contentType.indexOf("application/json") !== -1) {
      return response.json();
    }

    return response;
  });
}

export function getAuthorizationQuery(URL, token) {
  if (token) {
    return URL + '/' + token;
  }

  const authUser = getSavedAuthUser();

  if (authUser) {
    return URL + (URL.indexOf("?") === -1 ? "?" : "&") + "access_token=" + authUser.access_token;
  }

  return URL;
}
