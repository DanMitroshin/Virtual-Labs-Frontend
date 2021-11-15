import React, {useEffect, useState, useRef} from 'react';

import RequestWrapper from "../../helpers/RequestWrapper";
import {AppActivityIndicator} from "../ui/AppActivityIndicator";
import AppButton from "../ui/AppButton";
import {THEME} from "../../constants/THEME";
// import NetInfo from "@react-native-community/netinfo";
// import { Ionicons } from '@expo/vector-icons';
import {AppTextWithoutTags} from "../ui/AppText/AppTextWithoutTags";

const RequestView = (
    {
        post,
        request,
        onRequest = () => {},
        needDoRequest = true,
        useAccessCodes = false,
        body,
        meta,
        loading,
        children
    }) => {

    const {REQUEST} = RequestWrapper();
    const [error, setError] = useState("") // "Ошибка при выполнении запроса.")
    const counter = useRef(0);

    const doRequest = (req) => {

        if (req.trim().length === 0) {
            return;
        }

        setError("")
        console.log("|> NEW REQUEST:", req)
        const OnRequestProcess = (result) => {
            try {
                // if (counter.current === 0) {
                //     //
                //     throw Error
                // }
                // console.log("|> ON RESULT:", result)
                onRequest(result);
            } catch (e) {
                setError("Ошибка обработки запроса")
                counter.current = counter.current + 1
            }
        }

        const RequestResultProcess = (result) => {
            // console.log("|> ON RESULT:", result)
            if (result.status === 200) {
                OnRequestProcess(result);
            } else if (result.status === 403) {
                if (useAccessCodes) {
                    OnRequestProcess(result);
                } else {
                    setError("Похоже, сюда закрыт доступ")
                }
                // if (typeof onClose === 'function') {
                //     onClose();
                // }
                console.log("|> REQUEST 403 >>>", result)
            } else {
                if (result.status === 0) {
                    try {
                        let connectState = {isConnected: true}
                        // NetInfo.fetch().then(connectState => {
                        //     console.log("Connection type", connectState.type);
                        //     console.log("Is connected?", connectState.isConnected);

                        if (connectState.isConnected) {
                            setError(
                                "На сервере ведутся ремонтные работы\n\n" +
                                "Приносим извинения за доставленные неудобства, скоро всё будет работать:)\n" +
                                "Попробуй еще раз через пару минут"
                            )
                        } else {
                            setError(
                                "Проверь подключение к интернету и попробуй еще раз"
                            )
                        }
                        // });
                    } catch (e) {
                        setError(
                            "Проверь подключение к интернету и попробуй еще раз"
                        )
                    }
                } else if (Math.round(result.status / 100) === 5) {
                    try {
                        setError("Ошибка на сервере при обработке запроса: " + result.message)
                    } catch (e) {
                        setError("Ошибка на сервере при обработке запроса")
                    }
                } else {
                    try {
                        setError("Ошибка: " + result.message)
                    } catch (e) {
                        setError("Ошибка")
                    }
                }
            }
        }

        if (post) {
            REQUEST.POST({request: req, body, meta}).then(res => RequestResultProcess(res))
        } else {
            REQUEST.GET({request: req, meta}).then(res => RequestResultProcess(res))
        }
    }

    useEffect(() => {
        if (needDoRequest) {
            doRequest(request);
        }
    }, [request, needDoRequest])


    if (error) {
        return <div style={styles.screen}>
            {/*{typeof onClose === 'function' &&*/}
            {/*<TouchableOpacity*/}
            {/*    style={styles.onClose}*/}
            {/*    onPress={onClose}>*/}
            {/*    <Ionicons name="close-circle" size={48} color={THEME.RED_500} />*/}
            {/*</TouchableOpacity>}*/}
            <AppTextWithoutTags style={styles.errorText}>
                {error}
            </AppTextWithoutTags>
            <AppButton onPress={() => doRequest(request)}>
                Повторить
            </AppButton>
        </div>
    }
    if (loading) {
        return <div style={styles.screen}>
            <AppActivityIndicator/>
        </div>
    }

    return children

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%',
        // backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        fontFamily: THEME.MAIN_FONT_BOLD,
        marginBottom: 10,
        paddingHorizontal: 20,
        width: '100%',
        textAlign: 'center',
    },
    onClose: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
});

export default RequestView;