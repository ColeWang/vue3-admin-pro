import { defineComponent, Fragment } from 'vue'
import BaseFieldProps from '../BaseFieldProps'
import { DatePicker } from 'ant-design-vue'
import { formatDate } from '../utils'

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
        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const { format } = fieldProps
            const placeholder = fieldProps.placeholder || '请选择'
            const renderFormItem = props.renderFormItem || slots.renderFormItem

            if (mode === 'read') {
                const valueText = formatDate(text, format)
                return (
                    <Fragment>{valueText || emptyText}</Fragment>
                )
            }
            if (mode === 'edit') {
                const renderDom = (
                    <DatePicker
                        v-slots={slots}
                        format={format}
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
