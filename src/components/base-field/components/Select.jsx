import { computed, defineComponent, unref } from 'vue'
import { Select } from 'ant-design-vue'
import { useLocaleReceiver } from '@/components/locale-provider'
import BaseFieldProps from '../BaseFieldProps'
import { valueEnumParsingText, valueEnumToOptions } from '../utils/valueEnum'
import { isFunction } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: { ...BaseFieldProps },
    setup (props, { slots }) {
        const { t } = useLocaleReceiver('global')

        const options = computed(() => {
            return valueEnumToOptions(props.valueEnum)
        })

        return () => {
            const { mode, text, valueEnum, fieldProps } = props
            const placeholder = fieldProps.placeholder || t('selectPlaceholder')
            const renderFormItem = props.renderFormItem || slots.renderFormItem

            if (mode === 'read') {
                return valueEnumParsingText(text, valueEnum)
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
                    return renderFormItem(text, { mode, fieldProps }, renderDom)
                }
                return renderDom
            }
            return null
        }
    }
})
