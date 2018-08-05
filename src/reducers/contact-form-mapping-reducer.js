
const initialState = [
  { name: "name", type: "text", label: "Name", placeholder: "Enter name", required: true, requiredText: "Client name is required" },
  { name: "email", type: "email", label: "Email", placeholder: "Enter email", required: true, requiredText: "Client email is required" },
  { name: "phone", type: "text", label: "Phone", placeholder: "Enter phone" },
  { name: "phone2", type: "text", label: "Other Phone", placeholder: "Enter other phone" },
  { name: "title", type: "text", label: "Job Title", placeholder: "Enter job title" },
  { name: "is_public", type: "checkbox", label: "Public to Clients" },

]

export const contactFormMappingReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};