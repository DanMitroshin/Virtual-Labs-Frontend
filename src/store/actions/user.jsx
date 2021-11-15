import {UPDATE_USER, VK_USER, SET_USER_DATA, REMOVE_USER} from "../types";

export const loadUserData = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SET_USER_DATA,
            payload: data,
        });
    };
};

export const updateUser = (data) => {
    return async (dispatch) => {
        dispatch({
            type: UPDATE_USER,
            payload: data,
        });
    };
};


export const updateVkUser = (data) => {
    return async (dispatch) => {
        dispatch({
            type: VK_USER,
            payload: data,
        });
    };
};

export const removeUser = () => ({
    type: REMOVE_USER,
});