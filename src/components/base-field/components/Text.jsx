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
        }
    },
    setup (props, { slots }) {
        const { t } = useLocaleReceiver('global')

        return () => {
            const { type, mode, text, emptyText, fieldProps } = props
            const placeholder = fieldProps.placeholder || t('inputPlaceholder')
            const renderFormItem = props.renderFormItem || slots.renderFormItem

            if (mode === 'read') {
                return (
                    <Fragment>
                        {slots.prefix && slots.prefix()}
                        {text ?? emptyText}
                        {slots.suffix && slots.suffix()}
                    </Fragment>
                )
            }
            if (mode === 'edit') {
                const needFieldProps = {
                    type: type,
                    placeholder: placeholder,
                    allowClear: true,
                    ...fieldProps
                }
                const renderDom = (
                    <Input {...needFieldProps} v-slots={slots}/>
                )
                if (renderFormItem && isFunction(renderFormItem)) {
                    return renderFormItem(text, { mode, ...fieldProps }, renderDom)
                }
                return renderDom
            }
            return null
        }
    }
})
