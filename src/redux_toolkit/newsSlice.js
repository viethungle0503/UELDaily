import { createSlice } from '@reduxjs/toolkit';

export const newsSlice = createSlice({
    name: 'news',
    initialState: {
        news_UEL: [],
        bigPicture: [],
        smallPicture: [],

    },
    reducers: {
        setNews_UEL: (state, action) => {
            state.news_UEL.push(action.payload);
        },
        setBigPicture: (state, action) => {
            state.bigPicture.push(action.payload);
        },
        setSmallPicture: (state, action) => {
            state.smallPicture.push(action.payload);
        },
    },
})

// Action creators are generated for each case reducer function
export const { setNews_UEL,setBigPicture,setSmallPicture } = newsSlice.actions;

export default newsSlice.reducer;