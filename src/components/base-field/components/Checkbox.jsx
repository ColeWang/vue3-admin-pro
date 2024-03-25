import { computed, defineComponent, unref } from 'vue'
import { Checkbox } from 'ant-design-vue'
import BaseFieldProps from '../BaseFieldProps'
import { valueEnumParsingText, valueEnumToOptions } from '../utils/valueEnum'
import { isFunction } from 'lodash-es'

/**
 * @todo 待优化
 * validateStatus 变化应该使组件颜色变化
 * 组件库没有对外暴露 Form.Item 的 Status
 */
export default defineComponent({
    inheritAttrs: false,
    props: { ...BaseFieldProps },
    setup (props, { slots }) {
        const options = computed(() => {
            return valueEnumToOptions(props.valueEnum)
        })

        return () => {
            const { mode, text, valueEnum, fieldProps } = props
            const renderFormItem = props.renderFormItem || slots.renderFormItem

            if (mode === 'read') {
                return valueEnumParsingText(text, valueEnum)
            }
            if (mode === 'edit') {
                const needFieldProps = {
                    options: unref(options),
                    ...fieldProps
                }
                const renderDom = (
                    <Checkbox.Group {...needFieldProps} v-slots={slots}/>
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
