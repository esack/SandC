import { SET_APP_TITLE, SET_APP_DESCRIPTION, SET_APP_ERROR, SET_APP_TOGGOLE_MODAL, SET_APP_PDF_VIEWER } from '../actions/action-types';

const initialState = { title: "S & C", description: "", error: "", success: "", show_modal: false, pdf_viewer_url: '' };

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_TITLE:
      return {
        ...state,
        title: action.payload
      };
    case SET_APP_DESCRIPTION:
      return {
        ...state,
        description: action.payload
      };
    case SET_APP_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_APP_TOGGOLE_MODAL:
      return {
        ...state,
        show_modal: action.payload
      };
    case SET_APP_PDF_VIEWER:
      return {
        ...state,
        pdf_viewer_url: action.payload
      };
    default:
      return state;
  }
}