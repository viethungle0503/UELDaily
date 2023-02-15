import { createSlice } from '@reduxjs/toolkit';
// import update from 'react-addons-update';

export const databaseSlice = createSlice({
  name: 'database',
  initialState: {
    db_app:[],
    db_uel:[],
    db_departments:[],
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    setDB_App: (state, action) => {
      state.db_app = action.payload;
    },
    setDB_UEL:(state, action) => {
      state.db_uel = action.payload;
    },
    setDepartments:(state,action) => {
      state.db_departments = action.payload;
    },
    setSeenTrue: (state, action) => {
      state.db_app[action.payload[0]].data.notices[action.payload[1]].seen = true;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDB_App, setDB_UEL, setDepartments,setSeenTrue } = databaseSlice.actions;

export default databaseSlice.reducer;

