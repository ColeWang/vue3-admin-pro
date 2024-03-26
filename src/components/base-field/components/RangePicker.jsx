import { defineComponent, Fragment } from 'vue'
import { RangePicker } from 'ant-design-vue'
import { useLocaleReceiver } from '@/components/locale-provider'
import BaseFieldProps from '../BaseFieldProps'
import { isArray, isFunction } from 'lodash-es'
import { formatDate } from '../utils'

export default defineComponent({
    inheritAttrs: false,
    props: { ...BaseFieldProps },
    setup (props, { slots }) {
        const { t } = useLocaleReceiver('global')

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const { ranges, format } = fieldProps
            const placeholder = fieldProps.placeholder || [t('selectPlaceholder'), t('selectPlaceholder')]
            const renderFormItem = props.renderFormItem || slots.renderFormItem

            if (mode === 'read') {
                const [startText, endText] = isArray(text) ? text : []
                const valueStartText = formatDate(startText, format)
                const valueEndText = formatDate(endText, format)
                return (
                    <Fragment>
                        {valueStartText ?? emptyText}
                        {'~'}
                        {valueEndText ?? emptyText}
                    </Fragment>
                )
            }
            if (mode === 'edit') {
                const needFieldProps = {
                    ranges: ranges,
                    format: format,
                    placeholder: placeholder,
                    allowClear: true,
                    ...fieldProps
                }
                const renderDom = (
                    <RangePicker {...needFieldProps} v-slots={slots}/>
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
