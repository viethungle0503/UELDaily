import { configureStore } from '@reduxjs/toolkit';
import databaseReducer from './databaseSlice'
import userReducer from './userSlice';
import {
  combineReducers,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    database: databaseReducer,
    user: userReducer,
  },
  middleware: [thunk],
});

export default store;