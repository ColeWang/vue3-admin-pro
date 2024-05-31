import { defineComponent, Fragment } from 'vue'
import { Input } from 'ant-design-vue'
import { useLocaleReceiver } from '@/components/locale-provider'
import baseFieldProps from '../props'
import { getSlotVNode } from '@/utils/props-util'

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
                return (
                    <Fragment>
                        {slots.prefix && slots.prefix()}
                        {text ?? emptyText}
                        {slots.suffix && slots.suffix()}
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
