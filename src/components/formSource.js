export const userInputs = [
  {
    id: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "John ",
  },
  {
    id: "lastname",
    label: "Last Name",
    type: "text",
    placeholder: "Doe ",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "john_doe@gmail.com",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
  },
  {
    id: "address",
    label: "Address",
    type: "address",
  },


  {
    id: "phoneNumber",
    label: "Phone",
    type: "tel",
    placeholder: "+35387 567 8987",
  },
  {
    id: "role",
    label: "Role",
    type: "select",
    options: ["Doctor", "Nurse", "Admin"], // Options for the select input
  },
  
  {
    id: "permissions",
    label: "Permissions",
    type: "text",
    placeholder: "Permissions",
  },
  {
    id: "securityQuestion",
    label: "Security Question",
    type: "select",
    options: ["What is your mother's maiden name?",
    "What city were you born in?",
    "What is the name of your first pet?",
    "What is your favorite movie?",
    "What is your favorite food?"]
  },
  {
    id: "securityAnswer",
    label: " Security Answer",
    type: "text",
    placeholder: "Answer",
  },
];

// Ward Inputs
export const wardInputs = [
  {
    id: "name",
    label: "Ward Name",
    type: "text",
    placeholder: "General Ward",
  },
  {
    id: "description",
    label: "Ward Description",
    type: "text",
    placeholder: "Description",
  },
  {
    id: "responsibleDepartment",
    label: "Responsible Department",
    type: "text",
    placeholder: "Department",
  },
];


// Bed Inputs
export const bedInputs = [
  {
    id: "bedNumber",
    label: "Bed Number",
    type: "text",
    placeholder: "001",
  },
  {
    id: "bedType",
    label: "Bed Type",
    type: "text",
    placeholder: "Single",
  },

];

export const patientInputs = [
  {
    id: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "John",
  },
  {
    id: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Doe",
  },
  {
    id: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
  },
  {
    id: "contactInformation",
    label: "Contact Information",
    type: "text",
    placeholder: "Contact details",
  },
  {
    id: "gender",
    label: "Gender",
    type: "select",
    options: ["Male", "Female", ], // Options for the select input
  },
  {
    id: "medicalHistory",
    label: "Medical History",
    type: "text",
    placeholder: "Medical history details",
  },
];
