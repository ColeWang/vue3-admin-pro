import Cookies from 'js-cookie'

export function setCookie (key, value, options) {
    const attributes = options || { expires: 1 }
    Cookies.set(key, value, attributes)
}

export function getCookie (key) {
    return Cookies.get(key)
}

export function removeCookie (key) {
    Cookies.remove(key)
}

export const TOKEN_KEY = 'TOKEN_KEY'
