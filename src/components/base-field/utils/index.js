import dayjs from 'dayjs'
import { isObject } from 'lodash-es'

export function formatDate (text, format) {
    // 可设置时区
    if (!text) return text
    if (typeof format === 'function') {
        return format(dayjs(text))
    } else {
        return dayjs(text).format(format || 'YYYY-MM-DD')
    }
}

export function valueEnumToOptions (valueEnum) {
    if (valueEnum && isObject(valueEnum)) {
        return Object.keys(valueEnum).map((key) => {
            const plain = valueEnum[key]
            const label = isObject(plain) ? plain.text : plain
            return { value: key, label: label }
        })
    }
    return undefined
}
