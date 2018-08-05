import { SET_APP_TITLE, SET_APP_DESCRIPTION, SET_APP_ERROR, SET_APP_TOGGOLE_MODAL, SET_APP_PDF_VIEWER } from './action-types';

export function setAppTitle(payload) {
  return { type: SET_APP_TITLE, payload };
}

export function setAppDescrition(payload) {
  return { type: SET_APP_DESCRIPTION, payload };
}

export function setAppError(payload) {
  return { type: SET_APP_ERROR, payload };
}

export function setPDFViewer(PDFurl) {
  return { type: SET_APP_PDF_VIEWER, payload: PDFurl };
}

export function toggleModal(show) {
  return { type: SET_APP_TOGGOLE_MODAL, payload: show };
}
