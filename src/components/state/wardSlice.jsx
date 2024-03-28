import { createSlice } from '@reduxjs/toolkit';

const wardSlice = createSlice({
  name: 'ward',
  initialState: {
    currentWard: null,
    // Add other ward-related state properties here
  },
  reducers: {
    setCurrentWard: (state, action) => {
      state.currentWard = action.payload;
    },
    // Add other reducers for ward actions
  },
});

export const { setCurrentWard } = wardSlice.actions;
export default wardSlice.reducer;
