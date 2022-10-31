export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_USER = 'SET_USER';
export const GET_INFORMATION = 'GET_INFORMATION';
export const GET_CREDENTIAL = 'GET_CREDENTIAL';

export const getCredential = credential => dispatch => {
    dispatch({
        type: GET_CREDENTIAL,
        payload: credential,
    });
}

const API_URL = '../ueldaily-hubing-default-rtdb-users-export.json'
export const getInformation = () => {
    try{
        return async dispatch => {
            const result = await fetch(API_URL, {
                method: GET,
                headers: {
                    'Content-Type':'application/json',
                }
            });
            const json = await result.json();
            if(json){
                dispatch({
                    type: GET_INFORMATION,
                    payload: json
                })
            }
            else{
                console.log("Unable to fetch");
            }
        }
    }
    catch(error) {
        console.log(error)
    }
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