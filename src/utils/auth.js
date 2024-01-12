import Cookies from 'js-cookie'

export const TOKEN_KEY = 'sessionID'

export function setToken (token, expires) {
    Cookies.set(TOKEN_KEY, token, { expires: expires || 1 })
}

export function getToken () {
    const token = Cookies.get(TOKEN_KEY)
    return token || undefined
}

export function removeToken () {
    Cookies.remove(TOKEN_KEY)
}

export function setCookie (key, value, expires) {
    Cookies.set(key, value, { expires: expires || 1 })
}

export function getCookie (key) {
    const value = Cookies.get(key)
    return value || undefined
}

export function removeCookie (key) {
    Cookies.remove(key)
}
