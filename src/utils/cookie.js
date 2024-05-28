import Cookies from 'js-cookie'

export function setCookie (key, value, expires) {
    Cookies.set(key, value, { expires: expires || 1 })
}

export function getCookie (key) {
    return Cookies.get(key)
}

export function removeCookie (key) {
    Cookies.remove(key)
}

export const TOKEN_KEY = 'TOKEN_KEY'
