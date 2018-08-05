const initialState = [
  { name: "file_date", type: "text", placeholder: "Enter Date", required: true, requiredText: "File date is required"},
  { name: "file_name", type: "text", placeholder: "Enter Name", required: true, requiredText: "File name is required"},
  { name: "version_description", type: "textarea", placeholder: "Enter description"},
  { name: "edition", type: "text", placeholder: "Edition" },
]

export const fileSmallContainerFormMappingReducer = 
(state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
