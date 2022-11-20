import {
    SET_LOGGED_IN,
    SET_USER,
    SET_CREDENTIAL,
    GET_TABLEDATA,
} from "./actions";

const initialLoginState = {    
    user: [],
    loggedIn: false,
    credential: [],                      
};
const initialDatabaseState = {
    tableData : [],
};

export function userReducer(state = initialLoginState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case SET_LOGGED_IN:
            return { ...state, loggedIn: action.payload };
        case SET_CREDENTIAL:
            return { ...state, credential: action.payload };
        default:
            return state;
    }
};

 export function databaseReducer(state = initialDatabaseState, action) {
    switch (action.type) {
        case GET_TABLEDATA:
            return {...state, tableData : action.payload}
        default:
            return state;
    }
 }

