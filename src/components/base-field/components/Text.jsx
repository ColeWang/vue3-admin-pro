import { defineComponent, Fragment } from 'vue'
import BaseFieldProps from '../BaseFieldProps'
import { Input } from 'ant-design-vue'

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...BaseFieldProps,
        type: {
            type: String,
            default: 'text'
        },
        emptyText: {
            type: String,
            default: '-'
        }
    },
    setup (props, { slots }) {
        return () => {
            const { type, mode, text, emptyText, fieldProps } = props
            const placeholder = fieldProps.placeholder || '请输入'
            const renderFormItem = props.renderFormItem || slots.renderFormItem

            if (mode === 'read') {
                return (
                    <Fragment>
                        {slots.prefix ? slots.prefix() : null}
                        {text || emptyText}
                        {slots.suffix ? slots.suffix() : null}
                    </Fragment>
                )
            }
            if (mode === 'edit') {
                const renderDom = (
                    <Input
                        v-slots={slots}
                        type={type}
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
