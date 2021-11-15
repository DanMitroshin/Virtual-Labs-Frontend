import {DELETE_TOKEN, SET_TOKEN, SET_ERROR_TOKEN} from "../types";

export const setToken = (token, userName) => {
    return async (dispatch) => {
        dispatch({
            type: SET_TOKEN,
            token: token,
            userName: userName
        });
    };
};

export const deleteToken = (data) => {
    return async (dispatch) => {
        dispatch({
            type: DELETE_TOKEN,
            token: "",
            userName: "",
        });
    };
};

export const setErrorToken = (error = "Error") => {
    return async (dispatch) => {
        dispatch({
            type: SET_ERROR_TOKEN,
            error: error
        });
    };
};