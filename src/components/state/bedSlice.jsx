import { createSlice } from '@reduxjs/toolkit';

const bedSlice = createSlice({
  name: 'bed',
  initialState: {
    currentBed: null,
    // Add other bed-related state properties here
  },
  reducers: {
    setCurrentBed: (state, action) => {
      state.currentBed = action.payload;
    },
    // Add other reducers for bed actions
  },
});

export const { setCurrentBed } = bedSlice.actions;
export default bedSlice.reducer;
