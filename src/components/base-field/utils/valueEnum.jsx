import { Badge, Space } from 'ant-design-vue'
import { compact, fromPairs, isArray, isNumber, isObject, isString, map } from 'lodash-es'
import { isEmpty } from '@/utils'

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
    const traverseOptions = (values) => {
        const result = []
        if (isArray(values) && values.length !== 0) {
            values.forEach((cur) => {
                const key = cur[value], text = cur[label], _children = cur[children]
                if (!isEmpty(key) && !isEmpty(text)) {
                    result.push([key, text])
                }
                if (isArray(_children) && _children.length !== 0) {
                    result.push(...traverseOptions(_children))
                }
            })
        }
        return result
    }
    const result = traverseOptions(options)
    return fromPairs(result)
}

export function valueEnumToText (text, valueEnum = {}) {
    if (isEmpty(text)) return text
    if (isArray(text)) {
        const children = compact(text).map((value) => {
            return valueEnumToText(value, valueEnum)
        })
        const spaceSlots = { split: () => (',') }
        return (
            <Space size={2} wrap={true} v-slots={spaceSlots}>
                {children}
            </Space>
        )
    }
    if (isString(text) || isNumber(text)) {
        const plain = valueEnum[text]
        if (plain && isObject(plain)) {
            return <Badge {...plain}/>
        }
        return isEmpty(plain) ? text : plain
    }
    return isObject(text) ? text.label : text
}
