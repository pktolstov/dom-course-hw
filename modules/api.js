import { authHost, notesHost } from './constants.js'

let token = ''
export const updateToken = (newToken) => {
    token = newToken
}

export let userName = ''
export const updatedName = (newName) => {
    userName = newName
}

export let loginStatus = false
export const updateLoginStatus = (newStatus) => {
    loginStatus = newStatus
}

export function postApi(commentToApi) {
    //console.log(token);
    return fetch(notesHost, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        //body: JSON.stringify({"text": "This is the manual text"})
        body: JSON.stringify(commentToApi),
    }).then((data) => {
        //console.log(data);
        return data
    })
}

export function getApi() {
    return fetch(notesHost, {
        method: 'GET',
        Authorization: `Bearer ${token}`,
    }).then((data) => {
        //console.log(data);
        return data
    })
}

export const loginApi = (login, password) => {
    return fetch(`${authHost}/login`, {
        method: 'POST',
        body: JSON.stringify({ login: login, password: password }),
    }).then((response) => {
        if (response.status === 201) {
            return response.json()
        } else if (response.status === 400) {
            alert('Вы ввели неправильный логин или пароль')
            
        }
    })
}

export const regApi = ({ login, name, password }) => {
    return fetch(authHost, {
        method: 'POST',
        headers: '',
        body: JSON.stringify(login, name, password),
    }).then((response) => {
        return response.json()
    })
}
