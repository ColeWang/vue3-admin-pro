import { isEqual, isFunction, isNaN, isNil, isObject, isUndefined, omitBy } from 'lodash-es'

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

export function omitNil (object = {}) {
    return omitBy(object, isEmpty)
}

export function omitUndefined (object = {}) {
    return omitBy(object, isUndefined)
}
