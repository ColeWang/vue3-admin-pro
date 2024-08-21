import { isProxy, toRaw } from 'vue'
import { cloneDeep, cloneWith, isArray, isNumber, isUndefined, omitBy, reduce, toString } from 'lodash-es'
import { isEmpty } from './is'

export function cloneProxyToRaw (proxy) {
    return cloneWith(proxy, (value) => {
        if (isProxy(value)) {
            const nextValue = toRaw(value)
            return cloneDeep(nextValue)
        } else {
            return value
        }
    })
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
    return value
}
