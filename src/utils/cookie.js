import Cookies from 'js-cookie'

export function setCookie (key, value, options) {
    Cookies.set(key, value, options || { expires: 1, path: '/' })
}

export function getCookie (key) {
    return Cookies.get(key)
}

export function removeCookie (key, options) {
    Cookies.remove(key, options || { path: '/' })
}
