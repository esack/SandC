
const initialState = [
  { name: "name", type: "text", label: "Name", placeholder: "Enter name", required: true, requiredText: "Client name is required" },
  { name: "email", type: "email", label: "Email", placeholder: "Enter email" },  
  { name: "phone", type: "text", label: "Phone", placeholder: "Enter phone" },
  { name: "phone2", type: "text", label: "Other Phone", placeholder: "Enter other phone" },
  { name: "apartment_number", type: "text", label: "Apartment Number", placeholder: "Enter apartment number", required: true, requiredText: "Client apartment number is required" },
  { name: "building_id", type: "select", label: "Building", options: [], required: true },
  { name: "number_of_rooms", type: "text", label: "Number Of Rooms", placeholder: "Enter number of rooms", required: true, requiredText: "Number of rooms is required" },
  { name: "status_id", type: "select", label: "Status", onlyUpdate:"true", options: [] },
  { name: "spouse_name", type: "text", label: "Spouse Name", placeholder: "Enter spouse name" },
  { name: "spouse_phone", type: "text", label: "Spouse Phone", placeholder: "Enter spouse phone" },
]

export const clientFormMappingReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};