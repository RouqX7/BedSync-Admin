// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import wardReducer from './wardSlice';
import bedReducer from './bedSlice'
import patientReducer from './patientSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    ward: wardReducer,
    bed: bedReducer,
    patient: patientReducer
    // Add other reducers if needed
  },
});

export default store;
