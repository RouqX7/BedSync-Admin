// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    // Add other user-related state properties here
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    // Add other reducers for user actions
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
