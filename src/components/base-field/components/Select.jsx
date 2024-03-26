import { computed, defineComponent, unref } from 'vue'
import { Select } from 'ant-design-vue'
import { useLocaleReceiver } from '@/components/locale-provider'
import BaseFieldProps from '../BaseFieldProps'
import { optionsToValueEnum, valueEnumToOptions, valueEnumToText } from '../utils/valueEnum'
import { isFunction, isUndefined } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: { ...BaseFieldProps },
    setup (props, { slots }) {
        const { t } = useLocaleReceiver('global')

        const options = computed(() => {
            if (isUndefined(props.valueEnum)) {
                return props.fieldProps.options || []
            }
            return valueEnumToOptions(props.valueEnum)
        })

        return () => {
            const { mode, text, emptyText, valueEnum, fieldProps } = props
            const placeholder = fieldProps.placeholder || t('selectPlaceholder')
            const renderFormItem = props.renderFormItem || slots.renderFormItem

            if (mode === 'read') {
                const { options: propsOptions, fieldNames } = fieldProps
                const optionsValueEnum = optionsToValueEnum(propsOptions, fieldNames)
                const valueText = valueEnumToText(text, valueEnum || optionsValueEnum)
                return valueText ?? emptyText
            }
            if (mode === 'edit') {
                const needFieldProps = {
                    options: unref(options),
                    placeholder: placeholder,
                    allowClear: true,
                    ...fieldProps
                }
                const renderDom = (
                    <Select {...needFieldProps} v-slots={slots}/>
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
