import { defineComponent, Fragment } from 'vue'
import BaseFieldProps from '../BaseFieldProps'
import { InputNumber } from 'ant-design-vue'

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
                    <InputNumber
                        v-slots={slots}
                        placeholder={placeholder}
                        min={0}
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
