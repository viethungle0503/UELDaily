import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        currentUser: {},
        scoreBoard: [{title:"Hello",data:[]}],
        isDataReady: false,
        atPreLogin1: true,
        atPreLogin2: false,
        currentLanguage: "vn",
        modules: [],
        lateModules: [],
    },
    reducers: {
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        setCurrentUserProfileImage: (state, action) => {
            state.currentUser.data.profileImage = action.payload
        },
        setScoreBoard: (state, action) => {
            state.scoreBoard = action.payload;
        },
        setScoreBoardByYear: (state, action) => {
            state.scoreBoard = state.scoreBoard.filter(item => item.data[0].startYear == action.payload)
        },
        setScoreBoardBySemester: (state, action) => {
            state.scoreBoard = state.scoreBoard.filter(item => item.data[0].semester == action.payload)
        },
        setIsDataReady: (state, action) => {
            state.isDataReady = action.payload;
        },
        setAtPreLogin1: (state, action) => {
            state.atPreLogin1 = action.payload;
        },
        setAtPreLogin2: (state, action) => {
            state.atPreLogin2 = action.payload;
        },
        setCurrentLanguage: (state, action) => {
            state.currentLanguage = action.payload;
        },
        setModules: (state, action) => {
            state.modules = action.payload;
        },
        setLateModules: (state, action) => {
            state.lateModules = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setLoggedIn, setCurrentUser, setCurrentUserProfileImage,
    setScoreBoard, setScoreBoardByYear, setScoreBoardBySemester,
    setIsDataReady, setAtPreLogin1, setAtPreLogin2,
    setCurrentLanguage,
    setModules,
    setLateModules } = userSlice.actions;

export default userSlice.reducer;