import { Badge, Space } from 'ant-design-vue'
import { isNumber, isObject, isString } from 'lodash-es'
import { isEmpty } from '@/utils/index.js'

export function valueEnumToOptions (valueEnum = {}) {
    return Object.keys(valueEnum).map((key) => {
        const plain = valueEnum[key]
        const label = isObject(plain) ? plain.text : plain
        return { value: key, label: label }
    })
}

export function valueEnumParsingText (text, valueEnum = {}) {
    if (Array.isArray(text)) {
        const children = text.map((value) => {
            return valueEnumParsingText(value, valueEnum)
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
