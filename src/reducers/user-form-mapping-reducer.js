
const initialState = [
  { name: "name", type: "text", label: "Name", placeholder: "Enter name", required: true, requiredText: "Users name is required" },
  { name: "email", type: "email", label: "Email", placeholder: "Enter email", required: true, requiredText: "Users email is required" },
  { name: "phone", type: "text", label: "Phone", placeholder: "Enter phone" },
  { name: "phone2", type: "text", label: "Other Phone", placeholder: "Enter other phone" },
]

export const userFormMappingReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};