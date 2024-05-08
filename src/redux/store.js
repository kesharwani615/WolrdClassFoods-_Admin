import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./features/authSlice";
import roleReducer from "./features/roleSlice";
import contactReducer from "./features/contactSlice";

export const store = configureStore({
  reducer: {
    auth:authReducer,
    role:roleReducer,
    contactUs:contactReducer
  },
})