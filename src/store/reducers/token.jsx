import {DELETE_TOKEN, SET_TOKEN, SET_ERROR_TOKEN, SET_TOKEN_FROM_DB} from "../types";

const initialState = {
    token: "",
    userName: "",
    loading: true,
    error: false,
};

export const TokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN_FROM_DB:
            return {
                ...state,
                token: action.token,
                userName: action.userName,
                loading: false,
                error: false,
            };
        case SET_TOKEN:
            return {
                ...state,
                token: action.token,
                userName: action.userName,
                loading: false,
                error: false,
            };
        case DELETE_TOKEN:
            return {
                ...state,
                token: "",
                userName: "",
            };

        case SET_ERROR_TOKEN:
            return {
                ...state,
                token: "",
                userName: "",
                error: action.error,
            };
        default:
            return state;
    }
};
