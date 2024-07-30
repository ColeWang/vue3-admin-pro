import { defineComponent, Fragment } from 'vue'
import { Input } from 'ant-design-vue'
import { useLocaleReceiver } from '../../locale-provider'
import baseFieldProps from '../props'
import { getPropsSlot, getSlotVNode } from '../../../utils/props-util'

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...baseFieldProps,
        type: {
            type: String,
            default: 'text'
        }
    },
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { type, mode, text, emptyText, fieldProps } = props
            const placeholder = fieldProps.placeholder || t('inputPlaceholder')

            if (mode === 'read') {
                const prefixDom = getPropsSlot(slots, fieldProps, 'prefix')
                const suffixDom = getPropsSlot(slots, fieldProps, 'suffix')
                return (
                    <Fragment>
                        {prefixDom}
                        {text ?? emptyText}
                        {suffixDom}
                    </Fragment>
                )
            }
            const needFieldProps = {
                type: type,
                allowClear: true,
                ...fieldProps,
                placeholder: placeholder
            }
            const dom = <Input {...needFieldProps} v-slots={slots}/>
            const slotScope = { text, props: { mode, ...fieldProps }, dom }
            const renderDom = getSlotVNode(slots, props, 'renderField', slotScope)
            return renderDom || dom
        }
    }
})
