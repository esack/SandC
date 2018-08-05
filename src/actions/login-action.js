import LoginAPI from '../api/login-api';

export function sendLogin() {  
  return function(dispatch) {
    return LoginAPI.login().then(user => {
      dispatch(loadUserSuccess(user));
    }).catch(error => {
      throw(error);
    });
  };
}