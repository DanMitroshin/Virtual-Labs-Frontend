import React from 'react';
import { useCookies } from 'react-cookie';
import {COOKIES_NAMES} from "../constants";
import {httpGet, httpPost} from "./networks";
import {useDispatch} from "react-redux";
import {addNotification} from "../store/actions/content";


const GetCorrectRequest = (request) => {
    if (typeof request === 'string') {
        return request
    } else {
        return request.N
    }
}

const RequestWrapper = (children) => {
    const [cookie, setCookie, removeCookie] = useCookies(
        [COOKIES_NAMES.TOKEN, ]);

    const dispatch = useDispatch();

    const AddNewError = (error) => {
        dispatch(addNotification({...error, id: Date.now()}))
    }

    const SetErrorToken = () => {
        removeCookie(COOKIES_NAMES.TOKEN, {path: '/'});
    }

    const CheckerRequest = ({result, meta}) => {
        try {
            if (result.status === 401) {
                SetErrorToken()
                AddNewError({code: 401, message: "Ошибка авторизации"});
                return false
            } else if (result.status === 403) {
                // if (meta.strong_access) {
                //     SetRoleRequest({});
                // }
                AddNewError({code: 403, message: "Ошибка доступа"})
                return false
            } else if (result.status !== 200) {
                AddNewError({code: result.status || 0, message: result.message})
                return false
            }
            //AddNewError({code: 200, message: "Всё ок!"})
            return true
        } catch (e) {
            console.log("Checker error", e);
            return true;
        }
    }

    const InnerHandler = ({result, handler, meta}) => {
        try {
            const isCorrect = CheckerRequest({result, meta})
            if (!isCorrect) {
                console.log("Checker catch errors:", result.message)
            } else {
                if (meta.login) {
                    const token = result.json["Token"];
                    //SetRoleRequest({token});
                    setCookie(COOKIES_NAMES.TOKEN, token, {path: '/'})
                    // SetRoleRequest({token});
                }
                if (meta.first) {
                    // SetRole({result});
                }
            }
        } catch (e) {

        }
        if (handler) {
            return handler(result)
        } else {
            return Promise.resolve(result)
        }
    }

    const onExit = () => {
        SetErrorToken()
    }

    const onGetUserInfo = () => {
        return GET({request: "user/"})
    }

    const GETWithToken = ({request, handler, token, meta = {}}) => {
        return httpGet({request: GetCorrectRequest(request), token, ms: meta.ms})
            .then(result => InnerHandler({result, handler, meta}))
    }

    const GET = ({request, handler, meta = {}}) => {
        return httpGet({request: GetCorrectRequest(request), token: cookie.token, ms: meta.ms})
            .then(result => InnerHandler({result, handler, meta}))
    }

    const POST = ({request, body, handler, meta = {}}) => {
        return httpPost({request: GetCorrectRequest(request), body, token: cookie.token, ms: meta.ms})
            .then(result => InnerHandler({result, handler, meta}))
    }

    const PROPS = {
        REQUEST: {
            GET,
            POST,
            CREATED: {
                EXIT: onExit,
                GET_USER_INFO: onGetUserInfo,
            },
            VALUES: {
                TOKEN: cookie.token,
            }
        },
    }


    if (typeof children === 'function') {
        return children(PROPS)
    }

    return PROPS


}


export default RequestWrapper;