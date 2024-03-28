import { createSlice } from '@reduxjs/toolkit';

const patientSlice = createSlice({
  name: 'patient',
  initialState: {
    currentPatient: null,
    // Add other patient-related state properties here
  },
  reducers: {
    setCurrentPatient: (state, action) => {
      state.currentPatient = action.payload;
    },
    // Add other reducers for patient actions
  },
});

export const { setCurrentPatient } = patientSlice.actions;
export default patientSlice.reducer;
