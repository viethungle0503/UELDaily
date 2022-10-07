export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_USER = 'SET_USER';

export const setloggedIn = loggedIn => dispatch => {
    dispatch({
        type: SET_LOGGED_IN,
        payload: loggedIn,
    });
}

export const setUser = user => dispatch => {
    dispatch({
        type: SET_USER,
        payload: user,
    });
}