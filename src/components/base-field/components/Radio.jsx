import { computed, defineComponent, Fragment, unref } from 'vue'
import { Radio } from 'ant-design-vue'
import BaseFieldProps from '../BaseFieldProps'
import { valueEnumToOptions } from '../utils'
import { isFunction } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...BaseFieldProps,
        type: {
            type: String,
            default: 'text'
        },
        emptyText: {
            type: String,
            default: '-'
        }
    },
    setup (props, { slots }) {
        const options = computed(() => {
            return valueEnumToOptions(props.valueEnum)
        })

        return () => {
            const { mode, text, emptyText, valueEnum, fieldProps } = props
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
                    ...fieldProps
                }
                const renderDom = (
                    <Radio.Group {...needFieldProps} v-slots={slots}/>
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
