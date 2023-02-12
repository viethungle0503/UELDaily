import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        currentUser: {},
        scoreBoard: [{ title: "Hello", data: [] }],
        testSchedule: [],
        activityScore: [],
        tuition:[],
        schedule:{},
        unreadNotice:0,
        course:[],
        information:[],
        profileImage:"",
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
        setProfileImage: (state, action) => {
            state.profileImage = action.payload
        },
        setScoreBoard: (state, action) => {
            state.scoreBoard = action.payload;
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
        setTestSchedule: (state, action) => {
            state.testSchedule = action.payload
        },
        setActivityScore: (state, action) => {
            state.activityScore = action.payload;
        },
        setTuition: (state, action) => {
            state.tuition = action.payload;
        },
        setSchedule: (state, action) => {
            state.schedule = action.payload;
        },
        setCourse: (state, action) => {
            state.course = action.payload;
        },
        setInformation: (state, action) => {
            state.information = action.payload;
        },
        setUnreadNotice: (state, action) => {
            state.unreadNotice = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setLoggedIn, setCurrentUser, setProfileImage,
    setScoreBoard,
    setIsDataReady, setAtPreLogin1, setAtPreLogin2,
    setCurrentLanguage, setTestSchedule, setActivityScore, setTuition, setSchedule, setCourse, setInformation,
    setModules, setUnreadNotice, 
    setLateModules } = userSlice.actions;

export default userSlice.reducer;