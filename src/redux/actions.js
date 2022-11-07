export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_USER = 'SET_USER';
export const SET_CREDENTIAL ='SET_CREDENTIAL';
export const GET_TABLEDATA = 'GET_TABLEDATA';

export const getTableData = tableData => dispatch => {
    dispatch({
        type: GET_TABLEDATA,
        payload: tableData
    });
}

export const setCredential = credential => dispatch => {
    dispatch({
        type: SET_CREDENTIAL,
        payload: credential,
    });
}

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