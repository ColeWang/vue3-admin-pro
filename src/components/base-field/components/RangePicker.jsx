import { defineComponent, Fragment } from 'vue'
import BaseFieldProps from '../BaseFieldProps'
import { RangePicker } from 'ant-design-vue'
import { isArray } from 'lodash-es'
import { formatDate } from '../utils'

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
        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const { ranges, format } = fieldProps
            const placeholder = fieldProps.placeholder || ['请选择', '请选择']
            const renderFormItem = props.renderFormItem || slots.renderFormItem

            if (mode === 'read') {
                const [startText, endText] = isArray(text) ? text : []
                const valueStartText = formatDate(startText, format)
                const valueEndText = formatDate(endText, format)
                return (
                    <Fragment>
                        {valueStartText || emptyText}
                        {'~'}
                        {valueEndText || emptyText}
                    </Fragment>
                )
            }
            if (mode === 'edit') {
                const renderDom = (
                    <RangePicker
                        v-slots={slots}
                        ranges={ranges}
                        format={format}
                        placeholder={placeholder}
                        allowClear={true}
                        {...fieldProps}
                    />
                )
                if (renderFormItem) {
                    return renderFormItem(text, { mode, fieldProps }, renderDom)
                }
                return renderDom
            }
            return null
        }
    }
})
