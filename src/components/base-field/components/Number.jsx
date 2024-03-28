import { defineComponent, Fragment } from 'vue'
import { InputNumber } from 'ant-design-vue'
import { useLocaleReceiver } from '@/components/locale-provider'
import baseFieldProps from '../props'
import { getSlotVNode } from '@/utils/props-util'

export default defineComponent({
    inheritAttrs: false,
    props: { ...baseFieldProps },
    setup (props, { slots }) {
        const { t } = useLocaleReceiver('global')

        return () => {
            const { mode, text, emptyText, fieldProps } = props
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
                placeholder: placeholder,
                min: 0,
                ...fieldProps
            }
            const dom = <InputNumber {...needFieldProps} v-slots={slots}/>
            const slotScope = { text, props: { mode, ...fieldProps }, dom }
            const renderDom = getSlotVNode(slots, props, 'renderField', slotScope)
            return renderDom || dom
        }
    }
})
