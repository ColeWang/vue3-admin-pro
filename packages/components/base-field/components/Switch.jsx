import { defineComponent } from 'vue'
import { Switch } from 'ant-design-vue'
import { useLocaleReceiver } from '../../locale-provider'
import baseFieldProps from '../props'
import { getSlotVNode } from '../../../utils/props-util'
import { isFunction } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: { ...baseFieldProps },
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        function onUpdateChecked (value) {
            const { fieldProps } = props
            if (isFunction(fieldProps['onUpdate:value'])) {
                fieldProps['onUpdate:value'](value)
            }
        }

        return () => {
            const { mode, text, fieldProps } = props
            const { value, checked, style, ...restFieldProps } = fieldProps

            if (mode === 'read') {
                const open = fieldProps.checkedChildren ?? t('open')
                const close = fieldProps.unCheckedChildren ?? t('close')
                return text ? open : close
            }
            const needFieldProps = {
                ...restFieldProps,
                checked: checked || value,
                ['onUpdate:checked']: onUpdateChecked
            }
            const dom = (
                <div style={style}>
                    <Switch {...needFieldProps} v-slots={slots}/>
                </div>
            )
            const slotScope = { text, props: { mode, ...fieldProps }, dom }
            const renderDom = getSlotVNode(slots, props, 'renderField', slotScope)
            return renderDom || dom
        }
    }
})
