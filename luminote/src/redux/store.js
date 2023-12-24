import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './index';

const store = configureStore({
  reducer: rootReducer,
  // Additional middleware and configuration can be added here
});

export default store;