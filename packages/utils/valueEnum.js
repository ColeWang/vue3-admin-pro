import { h } from 'vue'
import { Badge, Space } from 'ant-design-vue'
import { compact, isArray, isNumber, isObject, isString, map, reduce, set } from 'lodash-es'
import { isEmpty } from './is'

export function valueEnumToOptions (valueEnum = {}) {
    const options = map(valueEnum, (value, key) => {
        if (isEmpty(value)) return value
        if (isObject(value) && value.text) {
            const { text, disabled } = value
            return { value: key, label: text, disabled }
        }
        return { value: key, label: value }
    })
    return compact(options)
}

export function optionsToValueEnum (options = [], fieldNames) {
    const { value = 'value', label = 'label', children = 'children' } = fieldNames || {}
    const traverseOptions = (values = [], result) => {
        return reduce(values, (_, option = {}) => {
            const key = option[value], text = option[label]
            if (!(isEmpty(key) || isEmpty(text))) {
                set(result, key, text)
            }
            const curChildren = option[children]
            if (isArray(curChildren) && curChildren.length !== 0) {
                traverseOptions(curChildren, result)
            }
            return result
        }, result)
    }
    return traverseOptions(options, {})
}

export function valueEnumToText (text, valueEnum = {}) {
    if (isEmpty(text)) return text
    if (isArray(text)) {
        const children = compact(text).map((value) => {
            return valueEnumToText(value, valueEnum)
        })
        return h(Space, { size: 2, wrap: true }, {
            default: () => children,
            split: () => ','
        })
    }
    if (isString(text) || isNumber(text)) {
        const plain = valueEnum[text]
        if (plain && isObject(plain)) {
            return h(Badge, { ...plain })
        }
        return isEmpty(plain) ? text : plain
    }
    return isObject(text) ? text.label : text
}
