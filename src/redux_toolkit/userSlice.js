import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        currentUser:{},
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
    },
})

// Action creators are generated for each case reducer function
export const { setLoggedIn, setCurrentUser, setCurrentUserProfileImage} = userSlice.actions;

export default userSlice.reducer;