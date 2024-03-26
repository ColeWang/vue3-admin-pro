import dayjs from 'dayjs'
import { cloneDeep, divide, multiply, toNumber } from 'lodash-es'

/* -------------------- Table -------------------- */
export function formatMoney (value, digit = 2, divided = 100) {
    let result = value + ''
    result = result.replace(/[^-0-9.]/g, '')
    result = toNumber(result)
    if (!isNaN(result)) return divide(result, divided).toFixed(digit)
    return '--'
}

export function formatRate (value) {
    const n = toNumber(value)
    if (!isNaN(n)) return multiply(n, 100).toFixed(2) + '%'
    return '--'
}

export function formatNumber (value, digit = 2) {
    const n = toNumber(value)
    if (!isNaN(n)) return toNumber(n.toFixed(digit))
    return '--'
}

export function formatTime (value, template = 'YYYY-MM-DD HH:mm:ss') {
    const time = dayjs(value)
    if (time.isValid()) {
        return time.format(template)
    }
    return '--'
}

/* -------------------- Search -------------------- */
export function genSortParams (sort) {
    const sortParams = cloneDeep(sort)
    Object.keys(sortParams).forEach((key) => {
        const value = sortParams[key]
        if (value === 'descend') {
            sortParams[key] = -1
        }
        if (value === 'ascend') {
            sortParams[key] = 1
        }
    })
    return sortParams
}
