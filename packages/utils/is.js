import { Comment, Fragment } from 'vue'
import { isEqual, isFunction, isNaN, isNil, isObject, isSymbol } from 'lodash-es'

export function isValidElement (c) {
    return c && c.__v_isVNode && !isSymbol(c.type)
}

export function isEmptyElement (c) {
    const isEmptyText = c && c.type === Text && c.children.trim() === ''
    const isEmptyFragment = c && c.type === Fragment && c.children.length === 0
    return c && (c.type === Comment || isEmptyText || isEmptyFragment)
}

export function isPromise (value) {
    // value instanceof Promise
    return isObject(value) && isFunction(value.then)
}

export function isEmpty (value) {
    return isEqual(value, '') || isNil(value) || isNaN(value)
}

export function isEmptyObject (object = {}) {
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            return false
        }
    }
    return true
}
