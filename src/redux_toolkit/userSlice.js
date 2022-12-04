import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        currentUser:{},
        scoreBoard:[],
    },
    reducers: {
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload
        },
        setCurrentUser:(state,action) => {
            state.currentUser = action.payload
        },
        setCurrentUserProfileImage:(state,action) => {
            state.currentUser.data.profileImage = action.payload
        },
        setScoreBoard:(state,action) => {
            state.scoreBoard = action.payload;
        },
        setScoreBoardByYear:(state,action) => {
            state.scoreBoard = state.scoreBoard.filter(item => item.year_type == action.payload)
        },
        setScoreBoardBySemester:(state,action) => {
            state.scoreBoard.forEach(value => {
                value.semester = value.semester.filter(item => item.semester_type == action.payload);
            })
        },
    },
})

// Action creators are generated for each case reducer function
export const { setLoggedIn, setCurrentUser, setCurrentUserProfileImage, setScoreBoard, setScoreBoardByYear, setScoreBoardBySemester} = userSlice.actions;

export default userSlice.reducer;