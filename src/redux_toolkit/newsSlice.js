import { createSlice } from '@reduxjs/toolkit';

export const newsSlice = createSlice({
    name: 'news',
    initialState: {
        news_UEL: [],

    },
    reducers: {
        setNews_UEL: (state, action) => {
            state.news_UEL.push(action.payload);
        },
    },
})

// Action creators are generated for each case reducer function
export const { setNews_UEL } = newsSlice.actions;

export default newsSlice.reducer;