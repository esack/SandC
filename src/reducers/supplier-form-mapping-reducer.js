
const initialState = [
  { name: "supplier_name", type: "text", label: "Company Name", placeholder: "Enter compamy name", required: true, requiredText: "Company name is required"},
  { name: "phone", type: "text", label: "Company Phone", placeholder: "Enter phone"},
  { name: "email", type: "email", label: "Company Email", placeholder: "Enter email"},
  { name: "website", type: "text", label: "Company Website", placeholder: "Enter website"},
  { name: "is_public", type: "checkbox", label: "Public to Clients"},
]

export const supplierFormMappingReducer = (state = initialState, action) => {  
  switch(action.type) {
    default: 
      return state;
  }
};