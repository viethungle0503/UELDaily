import { createSlice } from '@reduxjs/toolkit';
// import update from 'react-addons-update';

export const databaseSlice = createSlice({
  name: 'database',
  initialState: {
    db_app:[],
    db_uel:[]
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    getDatabaseAccount: (state, action) => {
      
      //  const account = {key: action.payload.key, data: action.payload.data}
      // state.db_app.push(account);
      state.db_app.push(action.payload);
    },
    getStudent:(state, action) => {
      state.db_uel.push(action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { getDatabaseAccount, getStudent } = databaseSlice.actions;

export default databaseSlice.reducer;