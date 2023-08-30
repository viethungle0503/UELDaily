import { createSlice } from '@reduxjs/toolkit';

export const newsSlice = createSlice({
    name: 'news',
    initialState: {
        news_UEL: [],
        news_Departments:[],


    },
    reducers: {
        setNews_UEL: (state, action) => {
            state.news_UEL = (action.payload);
        },
        wipeNews_Departments: (state, action) => {
            state.news_Departments = [];
        },
        setSingleNews_Departments: (state, action) => {
            state.news_Departments.push(action.payload);
        },

    },
})

// Action creators are generated for each case reducer function
export const { setNews_UEL,wipeNews_Departments, setSingleNews_Departments} = newsSlice.actions;

export default newsSlice.reducer;