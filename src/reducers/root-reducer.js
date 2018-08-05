import { combineReducers } from 'redux';
import { projectsReducer } from './projects-reducer';
import { projectReducer } from './project-reducer';
import { projectClientStatusReducer } from './project-client-status-reducer';
import { projectFormMappingReducer } from './project-form-mapping-reducer';
import { clientsReducer } from './clients-reducer';
import { clientsSupplierReducer } from './clients-supplier-reducer';
import { clientReducer } from './client-reducer';
import { clientFormMappingReducer } from './client-form-mapping-reducer';
import { suppliersReducer } from './suppliers-reducer';
import { supplierReducer } from './supplier-reducer';
import { supplierFormMappingReducer } from './supplier-form-mapping-reducer';
import { contactReducer } from './contact-reducer';
import { contactFormMappingReducer } from './contact-form-mapping-reducer';
import { filesContainerReducer } from './files-container-reducer';
import { fileContainerReducer } from './file-container-reducer';
import { fileContainerFormMappingReducer } from './file-container-form-mapping-reducer';
import { fileReducer } from './file-reducer';
import { fileSmallContainerFormMappingReducer } from './file-small-container-form-mapping-reducer';
import { fileTypesReducer } from './file-types-reducer';
import { usersReducer } from './users-reducer';
import { userReducer } from './user-reducer';
import { userFormMappingReducer } from './user-form-mapping-reducer';
import { authUserReducer } from './auth-user-reducer';
import { appReducer } from './app-reducer';

export const rootReducer = combineReducers({
  projectsReducer,
  projectReducer,
  projectFormMappingReducer,
  projectClientStatusReducer,
  clientsReducer,
  clientsSupplierReducer,
  clientReducer,
  clientFormMappingReducer,
  suppliersReducer,
  supplierReducer,
  supplierFormMappingReducer,
  contactReducer,
  contactFormMappingReducer,
  filesContainerReducer,
  fileContainerReducer,
  fileContainerFormMappingReducer,
  fileReducer,
  fileSmallContainerFormMappingReducer,
  fileTypesReducer,
  usersReducer,
  userReducer,
  userFormMappingReducer,
  authUserReducer,
  appReducer
});

export default rootReducer;
