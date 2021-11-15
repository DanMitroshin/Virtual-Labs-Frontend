import {ADD_NOTIFICATION, DELETE_NOTIFICATION, DELETE_ALL_NOTIFICATIONS} from "../types";

const initialState = {
    notifications: [],
    loading: false,
    error: false,
};

export const ContentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return {
                ...state,
                notifications: [...state.notifications, action.notification],
                loading: false,
                error: false,
            };
        case DELETE_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.filter(n => n.id !== action.notification.id),
                loading: false,
                error: false,
            };
        case DELETE_ALL_NOTIFICATIONS:
            return {
                ...state,
                notifications: [],
                loading: false,
                error: false,
            };
        default:
            return state;
    }
};
