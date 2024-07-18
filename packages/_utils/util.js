import {
    isArray,
    isEqual,
    isFunction,
    isNaN,
    isNil,
    isNumber,
    isObject,
    isUndefined,
    omitBy,
    reduce,
    toString
} from 'lodash-es'

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

export function toPx (value) {
    if (value && isNumber(value)) {
        return `${value}px`
    }
    return undefined
}

export function namePathToString (namePath) {
    if (namePath && isArray(namePath)) {
        const pathString = reduce(namePath, (total, value, index) => {
            const result = isNumber(value) && index > 0 ? `[${value}]` : `.${value}`
            return total + result
        }, '')
        return pathString.replace(/^\./, '')
    }
    return toString(namePath)
}
