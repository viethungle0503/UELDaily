import { configureStore } from '@reduxjs/toolkit';
import databaseReducer from './databaseSlice'
import userReducer from './userSlice';
import newsReducer from './newsSlice';
import { combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {autoMergeLevel2, hardSet} from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistStore, persistReducer } from 'redux-persist'


const rootPersistConfig = {
  key: 'root',
  storage : AsyncStorage,
}
const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
}
const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  database: databaseReducer,
  news: newsReducer,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
});
export const persistor = persistStore(store)
export default store;
