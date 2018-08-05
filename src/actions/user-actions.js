import { userInitialState, authUserInitialState } from './initial-state'
import {
  USERS_LOADED,
  USER_LOADED,
  USER_CREATED,
  USER_UPDATED,
  USERS_ADD_CREATED,
  USERS_SET_UPDATED,
  SET_APP_ERROR,
  USER_RESET,
  USER_LOGIN
} from './action-types';

import UserAPI from '../api/user-api';

export function loadUsers() {
  return function (dispatch) {
    return UserAPI.getUsers().then(response => {
      dispatch({ type: USERS_LOADED, payload: response.users });
    }).catch(response => {
      throw (response);
    });
  };
}

export function loadUser(userID) {
  return function (dispatch) {
    return UserAPI.getUser(userID).then(response => {
      dispatch({ type: USER_LOADED, payload: response.user });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " +  error.Message});
      });
      throw (response);
    });
  };
}

export function createUser(user) {
  return function (dispatch) {
    return UserAPI.createUser(user).then(response => {
      dispatch({ type: USER_CREATED, payload: response.user });
      dispatch({ type: USERS_ADD_CREATED, payload: response.user });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " +  error.Message});
      });
      throw (response);
    });
  };
}

export function updateUser(id, user) {
  return function (dispatch) {
    return UserAPI.updateUser(id, user).then(response => {
      dispatch({ type: USER_UPDATED, payload: response.user });
      dispatch({ type: USERS_SET_UPDATED, payload: response.user });
    }).catch(response => {
      response.json().then(error => {
        dispatch({ type: SET_APP_ERROR, payload: response.statusText + ": " +  error.Message});
      });
      throw (response);
    });
  };
}

export function setUserReset() {
  return { type: USER_RESET, payload: userInitialState };
}

export function login(email, password) {
  return function () {
    return UserAPI.login(email, password).then(response => {
      return response;
    }).catch(response => {
      throw (response);
    });
  };
}

export function setAuthUserAfterlogin(email, response, remember_me) {
  var authUser = {
    user_id: 0,
    name: "",
    phone: "",
    phone2: "",
    role: "",
    email: email,
    access_token: response.access_token,
    expires_in: response.expires_in
  }

  saveAuthUser(authUser);

  return function (dispatch) {
    return UserAPI.loadUserByEmail(email).then(user_response => {
      authUser.user_id = user_response.user.user_id;
      authUser.name = user_response.user.name;
      authUser.phone = user_response.user.phone;
      authUser.phone2 = user_response.user.phone2;
      authUser.role = user_response.user.user_type;

      saveAuthUser(authUser);

      dispatch({ type: USER_LOGIN, payload: authUser });
    }).catch(response => {
      throw (response);
    });
  }
}

export function register(auth_user) {
  return function () {
    return UserAPI.register(auth_user).then(response => {
      return response
    }).catch(response => {
      throw (response);
    });
  };
}

export function passwordReset(email) {
  return function () {
    return UserAPI.passwordReset(email).then(response => {
      return response
    }).catch(response => {
      throw (response);
    });
  };
}

export function setAuthUser(auth_user) {
  return { type: USER_LOGIN, payload: auth_user };
}

export function saveAuthUser(authUser) {
  localStorage.setItem("auth_user", JSON.stringify(authUser));
}

export function getSavedAuthUser() {
  var auth_user = JSON.parse(localStorage.getItem("auth_user"));

  return auth_user;
}

export function removeAuthUser() {
  localStorage.removeItem("auth_user");
  setAuthUser(authUserInitialState);
}