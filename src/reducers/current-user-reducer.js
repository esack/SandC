import { PROFILE_GET_SUPPLIERS } from 'constants/action-types';

//const userAuth = JSON.parse(localStorage.getItem('ls.authorizationData') || '{}');

const initialState = {
  accessToken: userAuth.token,
  accountId: userDetails.accountID,
  firstName: userDetails.firstName,
  lastName: userDetails.lastName
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_GET_SUPPLIERS.success:
      return {
        ...state,
        availableSuppliersToActivate: action.payload
          .data
          .accountSupplierDetails
          .availableSuppliersToActivate
      };

    default:
      return state;
  }
};
