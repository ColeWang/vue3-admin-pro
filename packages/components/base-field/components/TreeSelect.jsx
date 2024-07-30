import { defineComponent } from 'vue'
import { TreeSelect } from 'ant-design-vue'
import { useLocaleReceiver } from '../../locale-provider'
import baseFieldProps from '../props'
import { optionsToValueEnum, valueEnumToText } from '../../../utils/valueEnum'
import { getSlotVNode } from '../../../utils/props-util'

export default defineComponent({
    inheritAttrs: false,
    props: { ...baseFieldProps },
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const { options, ...restFieldProps } = fieldProps
            const placeholder = fieldProps.placeholder || t('selectPlaceholder')

            if (mode === 'read') {
                const { options: propsOptions, fieldNames } = fieldProps
                const optionsValueEnum = optionsToValueEnum(propsOptions, fieldNames)
                const valueText = valueEnumToText(text, optionsValueEnum)
                return valueText ?? emptyText
            }
            const needFieldProps = {
                treeData: options,
                allowClear: true,
                ...restFieldProps,
                placeholder: placeholder
            }
            const dom = <TreeSelect {...needFieldProps} v-slots={slots}/>
            const slotScope = { text, props: { mode, ...fieldProps }, dom }
            const renderDom = getSlotVNode(slots, props, 'renderField', slotScope)
            return renderDom || dom
        }
    }
})
