import {ADD_NOTIFICATION, DELETE_NOTIFICATION, DELETE_ALL_NOTIFICATIONS} from "../types";

export const addNotification = (notification) => {
    return async (dispatch) => {
        dispatch({
            type: ADD_NOTIFICATION,
            notification
        });
    };
};

export const deleteNotification = (notification) => {
    return async (dispatch) => {
        dispatch({
            type: DELETE_NOTIFICATION,
            notification
        });
    };
};

export const deleteAllNotifications = () => {
    return async (dispatch) => {
        dispatch({
            type: DELETE_ALL_NOTIFICATIONS,
        });
    };
};