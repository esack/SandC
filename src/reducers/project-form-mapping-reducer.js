
const initialState = [
  { name: "project_name", type: "text", label: "Name", placeholder: "Enter name", required: true, requiredText: "Project name is required"},
  { name: "description", type: "textarea", label: "Description", placeholder: "Enter description"},
  { name: "project_status", type: "select", label: "Status", onlyUpdate:"true", options: [{ text: "Open", value: "OPEN" }, { text: "Closed", value: "CLOSED" }]},  
  { name: "project_buildings", type: "tags", label: "Buildings", tagKeyName: "building_id", tagValueName: "building_name"},
  { name: "contractor_supplier_name", type: "text", label: "Contractor Company Name", placeholder: "Enter compamy name", required: true, requiredText: "Contractor Company name is required"},
  { name: "contractor_supplier_phone", type: "text", label: "Contractor Company Phone", placeholder: "Enter phone"}
]

export const projectFormMappingReducer = (state = initialState, action) => {  
  switch(action.type) {
    default: 
      return state;
  }
};