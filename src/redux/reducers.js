import { SET_LOGGED_IN,
    SET_USER
} from "./actions";

const initialState = {
    loggedIn: false,
    user: [],
}

function userReducer(state =  initialState, action) {
    switch(action.type) {
        case SET_USER:
            return {...state, user: action.payload};
        case SET_LOGGED_IN:
            return {...state, loggedIn: action.payload};
        default: 
            return state;
    }
}

export default userReducer;