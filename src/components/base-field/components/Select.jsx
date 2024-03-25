import { computed, defineComponent, Fragment, unref } from 'vue'
import { Select } from 'ant-design-vue'
import { useLocaleReceiver } from '@/components/locale-provider'
import BaseFieldProps from '../BaseFieldProps'
import { valueEnumToOptions } from '../utils'
import { isFunction } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...BaseFieldProps,
        emptyText: {
            type: String,
            default: '-'
        }
    },
    setup (props, { slots }) {
        const { t } = useLocaleReceiver('global')

        const options = computed(() => {
            return valueEnumToOptions(props.valueEnum)
        })

        return () => {
            const { mode, text, emptyText, valueEnum, fieldProps } = props
            const placeholder = fieldProps.placeholder || t('selectPlaceholder')
            const renderFormItem = props.renderFormItem || slots.renderFormItem

            if (mode === 'read') {
                const valueText = valueEnum[text]
                return (
                    <Fragment>{valueText || emptyText}</Fragment>
                )
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
