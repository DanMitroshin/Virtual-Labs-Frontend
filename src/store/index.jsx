import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {UserReducer} from "./reducers/user";
import {TokenReducer} from "./reducers/token";
import {ContentReducer} from "./reducers/content";

// const store_name = "MindON-user-v.1.0.0";

const rootReducer = combineReducers({
    content: ContentReducer,
    user: UserReducer,
    token: TokenReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));

//
// const logger = store => next => action => {
//     let result;
//     console.groupCollapsed("dispatching", action.type);
//     console.log('prev state', store.getState());
//     console.log('action', action);
//     result = next(action);
//     console.log('next state', store.getState());
//     console.groupEnd();
//     return result;
// };
//
// const saver = store => next => action => {
//     let result = next(action);
//     localStorage[store_name] = JSON.stringify(store.getState());
//     return result;
// };
//
// const initStorage = (initialState = {}) => {
//     if (localStorage.getItem(store_name) !== null) {
//         return JSON.parse(localStorage.getItem(store_name));
//     } else {
//         localStorage.setItem(store_name, JSON.stringify(initialState));
//         return initialState;
//     }
// };
//
// export const storeFactory = (initialState = {}) => (
//     applyMiddleware(logger, saver)(createStore)(
//         combineReducers({
//             user,
//             courses
//         }),
//         initStorage(initialState)
//     )
// );
