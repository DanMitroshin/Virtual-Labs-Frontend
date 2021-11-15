import {UPDATE_USER, VK_USER, SET_USER_DATA, REMOVE_USER} from "../types";

const initialState = {
    name: "",
    userName: "",
    password: "temppassword",
    avatar: "https://img2.freepng.ru/20180420/krw/kisspng-computer-icons-mobile-app-development-android-my-account-icon-5ada4ab46cb066.5797683215242554124452.jpg",
    email: "",
    loading: true,
};

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                loading: false,
            };
        case UPDATE_USER:
            return {
                ...state,
                name: action.payload.name,
                userName: action.payload.userName,
                password: action.payload.password,
                email: action.payload.email,
                loading: false,
            };
        case VK_USER:
            return {
                ...state,
                name: action.payload.name,
                userName: action.payload.userName,
                loading: false,
            };
        case REMOVE_USER:
            return {
                ...state,
                name: "",
                userName: "",
                password: "",
                email: "",
            }
        default:
            return state;
    }
};
