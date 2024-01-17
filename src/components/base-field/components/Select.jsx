import { computed, defineComponent, Fragment, unref } from 'vue'
import BaseFieldProps from '../BaseFieldProps'
import { Select } from 'ant-design-vue'
import { isObject } from 'lodash-es'

function valueEnumToOptions (valueEnum) {
    if (valueEnum && isObject(valueEnum)) {
        return Object.keys(valueEnum).map((key) => {
            const plain = valueEnum[key]
            const label = isObject(plain) ? plain.text : plain
            return { value: key, label: label }
        })
    }
    return undefined
}

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...BaseFieldProps,
        emptyText: {
            type: String,
            default: '-'
        }
    },
    setup (props, { slots }) {
        const options = computed(() => {
            return valueEnumToOptions(props.valueEnum)
        })

        return () => {
            const { mode, text, emptyText, valueEnum, fieldProps } = props
            const placeholder = fieldProps.placeholder || '请选择'
            const renderFormItem = props.renderFormItem || slots.renderFormItem

            if (mode === 'read') {
                const valueText = valueEnum[text]
                return (
                    <Fragment>{valueText || emptyText}</Fragment>
                )
            }
            if (mode === 'edit') {
                const renderDom = (
                    <Select
                        v-slots={slots}
                        options={unref(options)}
                        placeholder={placeholder}
                        allowClear={true}
                        {...fieldProps}
                    />
                )
                if (renderFormItem) {
                    return renderFormItem(text, { mode, fieldProps }, renderDom)
                }
                return renderDom
            }
            return null
        }
    }
})