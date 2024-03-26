import { defineComponent } from 'vue'
import { Switch } from 'ant-design-vue'
import { useLocaleReceiver } from '@/components/locale-provider'
import BaseFieldProps from '../BaseFieldProps'
import { isFunction } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: { ...BaseFieldProps },
    setup (props, { slots }) {
        const { t } = useLocaleReceiver('global')

        function onUpdateChecked (value) {
            const { fieldProps } = props
            if (isFunction(fieldProps['onUpdate:value'])) {
                fieldProps['onUpdate:value'](value)
            }
        }

        return () => {
            const { mode, text, fieldProps } = props
            const renderFormItem = props.renderFormItem || slots.renderFormItem

            if (mode === 'read') {
                const open = fieldProps.checkedChildren ?? t('open')
                const close = fieldProps.unCheckedChildren ?? t('close')
                return text ? open : close
            }
            if (mode === 'edit') {
                const { value, checked, style, ...restFieldProps } = fieldProps
                const needFieldProps = {
                    checked: checked || value,
                    'onUpdate:checked': onUpdateChecked,
                    ...restFieldProps
                }
                const renderDom = (
                    <div style={style}>
                        <Switch {...needFieldProps} v-slots={slots}/>
                    </div>
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
