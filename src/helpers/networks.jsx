import {DB_URL} from "../constants";


const TimeoutPromise = ({ms = 10000, promise}) => {
    const totalMs = ms || 10000;
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            // {status: 408, json: {}, message: "Превышено время ожидания запроса"}
            reject(new Error("Превышено время ожидания запроса"))
        }, totalMs);
        promise.then(
            (res) => {
                clearTimeout(timeoutId);
                resolve(res);
            },
            (err) => {
                clearTimeout(timeoutId);
                reject(err);
            }
        );
    })
}


export const httpGet = async ({request, token = "", ms = 10000}) => {
    try {
        let headers = {
            "Content-Type": "application/json"
        };
        if (token) {
            headers = {
                'Authorization': 'Token ' + token,
                "Content-Type": "application/json"
            }
        }
        const response = await TimeoutPromise({ms, promise: fetch(`${DB_URL}/${request}`, {
                method: 'GET',
                headers: headers
            })});
        if (response.ok) {
            //console.log("GET OK", response);
            const json = await response.json();
            return {json: json, message: "", status: 200, type: 0}
        } else {
            let message
            if (response.status === 400) {
                message = "Ошибка запроса: неверно составленный запрос"
            } else if (response.status === 401) {
                message = "Пользователь не авторизован"
            } else if (response.status === 404) {
                message = "Ресурс не найден"
            } else if (response.status === 409) {
                message = "Пользователь с таким логином уже существует"
            } else if (response.status === 403) {
                message = "Ошибка доступа"
            } else {
                message = "Ошибка, код " + response.status.toString()
            }
            let json
            try {
                json = await response.json();
            } catch (e) {
                json = {}
            }
            return {json: json, message: message, status: response.status, type: 1}
        }
    } catch (err) {
        console.warn('httpGet error ', err);
        return {json: {}, message: err.toString(), status: 0, type: 2}
    }
};

export const httpPost = async ({request, token = "", body, ms = 10000}) => {
    try {
        let headers = {
            "Content-Type": "application/json"
        };
        if (token.length > 0) {
            headers = {
                'Authorization': 'Token ' + token,
                "Content-Type": "application/json"
            }
        }
        const response = await TimeoutPromise({ms, promise: fetch(`${DB_URL}/${request}`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            })});
        if (response.ok) {
            //console.log("POST OK", response);
            const json = await response.json();
            return {json: json, message: "", status: 200, type: 0}
        } else {
            let message
            //console.log("RRR", response);
            if (response.status === 400) {
                message = "Неверно составленный запрос, жалуйся на разработчиков..."
            } else if (response.status === 401) {
                message = "Пользователь не авторизован"
            } else if (response.status === 404) {
                message = "Ресурс не найден"
            } else if (response.status === 409) {
                message = "Пользователь с таким логином уже существует! Не притворяйся:)"
            } else if (response.status === 403) {
                message = "Ошибка доступа"
            } else {
                message = "Ошибка, код " + response.status.toString()
            }
            let json
            try {
                json = await response.json();
            } catch (e) {
                json = {}
            }
            return {json: json, message: message, status: response.status, type: 1}
        }
    } catch (err) {
        console.warn('httpPost error ', err);
        return {json: {}, message: err.toString(), status: 0, type: 2}
    }
};