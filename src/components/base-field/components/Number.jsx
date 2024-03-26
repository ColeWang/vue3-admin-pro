import { defineComponent, Fragment } from 'vue'
import { InputNumber } from 'ant-design-vue'
import { useLocaleReceiver } from '@/components/locale-provider'
import BaseFieldProps from '../BaseFieldProps'
import { isFunction } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: { ...BaseFieldProps },
    setup (props, { slots }) {
        const { t } = useLocaleReceiver('global')

        return () => {
            const { mode, text, emptyText, fieldProps } = props
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
                    placeholder: placeholder,
                    min: 0,
                    ...fieldProps
                }
                const renderDom = (
                    <InputNumber {...needFieldProps} v-slots={slots}/>
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
