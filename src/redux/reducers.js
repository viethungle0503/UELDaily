import { SET_LOGGED_IN,
    SET_USER,
    GET_INFORMATION,
    GET_CREDENTIAL,
} from "./actions";

const initialState = {
    user: [],
    loggedIn: false,
    information:[],
    credential: [],
}

function userReducer(state = initialState, action) {
    switch(action.type) {
        case SET_USER:
            return {...state, user: action.payload};
        case SET_LOGGED_IN:
            return {...state, loggedIn: action.payload};
        case GET_INFORMATION:
            return {...state, information: action.payload};
        case GET_CREDENTIAL:
            return {...state, credential: action.payload};
        default: 
            return state;
    }
}

export default userReducer;