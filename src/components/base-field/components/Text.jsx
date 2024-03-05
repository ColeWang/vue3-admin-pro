import { defineComponent, Fragment } from 'vue'
import { Input } from 'ant-design-vue'
import { useLocaleReceiver } from '@/components/locale-provider'
import BaseFieldProps from '../BaseFieldProps'
import { isFunction } from 'lodash-es'

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
        const { t } = useLocaleReceiver('Form')

        return () => {
            const { type, mode, text, emptyText, fieldProps } = props
            const placeholder = fieldProps.placeholder || t('inputPlaceholder')
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
                if (renderFormItem && isFunction(renderFormItem)) {
                    return renderFormItem(text, { mode, fieldProps }, renderDom)
                }
                return renderDom
            }
            return null
        }
    }
})
