import { defineComponent } from 'vue'
import { Cascader } from 'ant-design-vue'
import { useLocaleReceiver } from '@/components/locale-provider'
import baseFieldProps from '../props'
import { optionsToValueEnum, valueEnumToText } from '../utils/valueEnum'
import { getSlotVNode } from '@/utils/props-util'

export default defineComponent({
    inheritAttrs: false,
    props: { ...baseFieldProps },
    setup (props, { slots }) {
        const { t } = useLocaleReceiver('global')

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const placeholder = fieldProps.placeholder || t('selectPlaceholder')

            if (mode === 'read') {
                const { options: propsOptions, fieldNames } = fieldProps
                const optionsValueEnum = optionsToValueEnum(propsOptions, fieldNames)
                const valueText = valueEnumToText(text, optionsValueEnum)
                return valueText ?? emptyText
            }
            const needFieldProps = {
                placeholder: placeholder,
                allowClear: true,
                ...fieldProps
            }
            const dom = <Cascader {...needFieldProps} v-slots={slots}/>
            const slotScope = { text, props: { mode, ...fieldProps }, dom }
            const renderDom = getSlotVNode(slots, props, 'renderField', slotScope)
            return renderDom || dom
        }
    }
})
