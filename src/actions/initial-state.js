export const projectInitialState = {
  project_id: 0,
  project_name: '',
  description: '',
  project_buildings: [],
  project_client_statuses: [],
  project_file_types: [],
  project_status: 'OPEN',
  contractor_supplier_id: 0,
  contractor_supplier_name: '',
  contractor_supplier_phone: ''
};

export const clientInitialState = {
  user_id: 0,
  name: '',
  phone: '',
  phone2: '',
  email: '',
  project_id: 0,
  building_id: 0,
  building: '',
  status_id: 0,
  status_color: '',
  apartment_number: '',
  spouse_name: '',
  spouse_phone: '',
  number_of_rooms: '',
  client_suppliers: [],
  suppliers: []
};

export const clientsSupplierInitialState = {
  project_name: '',
  project_id: 0,
  supplier_name: '',
  supplier_id: 0,
  clients: []
};


export const supplierInitialState = {
  supplier_data: {
    supplier_id: 0,
    project_id: 0,
    supplier_name: '',
    phone: '',
    email: '',
    website: '',
    is_public: true,
    is_contractor: false,
    file_types: []
  },
  contacts: []
};

export const contactInitialState = {
  user_id: 0,
  supplier_id: 0,
  name: '',
  phone: '',
  phone2: '',
  email: '',
  title: '',
  is_public: true
};

export const fileContainerInitialState = {
  file_container: {
    files_container_id: 0,
    project_id: null,
    user_id: null,
    from_supplier_id: null,
    file_type_id: null,
    supplier_name: '',
    file_type: '',
    approved_file_id: null,
    approved_file_content_type: '',
    latest_file_id: null,
    latest_file_content_type: '',
    file_download_link: '',
    file_download_content_type: ''
  },
  files: []
};

export const fileInitialState = {
  file_id: 0,
  files_container_id: 0,
  file_date: null,
  file_name: '',
  content_type: '',
  file_download_link: '',
  version_description: '',
  file: null,
  edition: ''
};

export const projectClientStatusColors = {
  dark: ['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF'],
  light: ['#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3']
};

export const projectClientStatusInitialState = {
  project_id: 0,
  status_id: 0,
  status_name: '',
  status_color: ''
};

export const userInitialState = {
  user_id: 0,
  name: '',
  phone: '',
  phone2: '',
  email: ''
};

export const authUserInitialState = {
  user_id: 0,
  name: '',
  phone: '',
  phone2: '',
  email: '',
  access_token: '',
  expires_in: '',
  role: ''
};

export const fileContainerFormMappingInitialState = [
  { name: 'file_type_id', type: 'select', label: 'File type', options: [] },
  { name: 'file', type: 'file', label: 'Upload file' }
]
