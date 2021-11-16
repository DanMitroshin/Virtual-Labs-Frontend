import React, {useEffect, useState} from 'react';
import styles from "./styles.module.scss";
// import {NavLink} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import cn from 'classnames';
import Header from "../Menu";
// import { useCookies } from 'react-cookie';
// import {COOKIES_NAMES, MAIN_URL} from "../../constants";
import RequestWrapper from "../../helpers/RequestWrapper";
import {useSelector, useDispatch} from "react-redux";
import {deleteNotification} from "../../store/actions/content";


const ErrorMessage = ({error}) => {
    const date = new Date(error.id);
    return <div className={cn(styles.request_error, error.code === 200 && styles.green_notification)}>
        <div>
        {error.message + " "}
        </div>
        <div className={styles.request_error_time}>
            {
                date.getHours().toString()
            }:
            {
                date.getMinutes().toString().length === 1 ?
                    "0" + date.getMinutes().toString() : date.getMinutes().toString()
            }:
            {
                date.getSeconds().toString().length === 1 ?
                "0" + date.getSeconds().toString() : date.getSeconds().toString()
            }
        </div>
    </div>
}


function ContentWrapper({history, children}) {

    //const [context, setContext] = useContext(Context);

    // const [counter, setCounter] = useState(1)
    const [firstRequest, setFirstRequest] = useState(false);
    const [deleteCounter, setDeleteCounter] = useState(0);

    const dispatch = useDispatch();

    const ChangePage = (name) => {
        window.scroll(0, 0);
        history.push(name);
    }

    const {REQUEST} = RequestWrapper( (p) => ({...p}))

    useEffect(() => {
        if (!firstRequest && REQUEST.VALUES.TOKEN) {
            setFirstRequest(true)
            // REQUEST.GET({request: DB_PATH.USER, meta: {first: true}})
            //     .then(res => {
            //         console.log("Res CHECK first:", res)
            //         setFirstRequest(true);
            //     })
        }
        setFirstRequest(true);
    }, [firstRequest])

    const ERRORS = useSelector(state => state.content.notifications);

    useEffect(() => {
        try {
            if (ERRORS.length && ERRORS.length > deleteCounter) {
                setTimeout(() => {
                        dispatch(deleteNotification(ERRORS[deleteCounter]))
                        setDeleteCounter(c => c - 1)
                    },
                    4000)
                setDeleteCounter(c => c + 1)
            }
            console.log("NOTIFICATIONS! Length:", ERRORS.length, " toDelete:", deleteCounter)
        } catch (e) {
            console.log("Delete error", e)
        }
    }, [ERRORS, deleteCounter])

    const hasHeader = true; //history.location.pathname.toString() !== MAIN_URL.LANDING;

    // const [login, setLogin] = useState("denis_2")
    // const [password, setPassword] = useState("denis_2denis_2")
    // const [error, setError] = useState("")

    // const [cookies, setCookie, removeCookie] = useCookies([COOKIES_NAMES.TOKEN, COOKIES_NAMES.ROLE]);

    // function onSetToken(newToken) {
    //     setCookie(COOKIES_NAMES.TOKEN, newToken, { path: '/', maxAge: 60*60*24*30*2 }); // 2 month
    // }

    // const onLogin = () => {
    //     //console.log("Start auth");
    //     setError("");
    //     if (login === "" || password === "") {
    //         setError("Заполните все поля");
    //     } else {
    //         httpGet({
    //             request: `auth/?username=${login}&password=${password}`,
    //         }).then((res) => {
    //             if (res.message) {
    //                 setError("Ошибка: " + res.message);
    //             } else {
    //                 onSetToken(res["json"]["Token"])
    //             }
    //         });
    //     }
    // }

    // const SetErrorToken = () => {
    //     removeCookie(COOKIES_NAMES.TOKEN, {path: '/'});
    // }
    //
    // const onCheckRequest = (req) => {
    //     try {
    //         if (req.status === 401) {
    //             SetErrorToken()
    //         }
    //     } catch (e) {
    //         console.log("Checker error", e);
    //     }
    // }

    //const ContentContext = React.createContext({onCheckRequest});

    //const token = useSelector((state) => state.token.token);

    // useEffect(() => {
    //     console.log("COOKIES NEW")
    //     //console.log("History", history)
    //     //setModal(!cookies.token)
    //     if (!cookies.token) {
    //         window.scroll(0, 0);
    //         history.push(MAIN_URL.LANDING);
    //     }
    // }, [cookies])

    // useEffect(() => {
    //     console.log("Errors in CONTENT", ERRORS)
    // }, [ERRORS])

    // const [modal, setModal] = useState(false)

    //console.log("Type content children:", typeof children)

    return <div className={styles.content_main}>
        <Header onClick={ChangePage}>
            {children}
        </Header>
        {/*<AppModal*/}
        {/*    setModalVisible={() => setModal(false)}*/}
        {/*    modalVisible={modal}*/}
        {/*    canCloseOnBackdrop={false}*/}
        {/*>*/}
        {/*    <div className={styles.head_form}>Войти</div>*/}
        {/*    <div>*/}
        {/*        <AppInput label="Логин" value={login} setValue={setLogin}*/}
        {/*                  placeholder="Введите логин"/>*/}
        {/*        <AppInput label="Пароль" value={password} setValue={setPassword}*/}
        {/*                  placeholder="Введите пароль" type="password"/>*/}
        {/*    </div>*/}
        {/*    <div className={styles.error}>{error}</div>*/}
        {/*    <AppButton onClick={() => {}}>Войти</AppButton>*/}
        {/*</AppModal>*/}
        {/*<div className={styles.content}>*/}
        {/*    {children}*/}
            {/*{typeof children === 'function' ? RequestWrapper((p) => children({...p})) : children}*/}
        {/*</div>*/}
        {/*<Header onClick={ChangePage}/>*/}
        <div className={styles.request_error_block}>
            {ERRORS.filter((e, i) => i < 3)
                .map((error, i) => <ErrorMessage error={error} key={i}/>)}
        </div>
    </div>;
}


export default withRouter(ContentWrapper);
