import { defineComponent, Fragment } from 'vue'
import { Slider } from 'ant-design-vue'
import baseFieldProps from '../props'
import { isArray, isFunction } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: { ...baseFieldProps },
    setup (props, { slots }) {
        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const renderFormItem = props.renderFormItem || slots.renderFormItem

            if (mode === 'read') {
                if (isArray(text)) {
                    const [startText, endText] = text
                    return (
                        <Fragment>
                            {startText ?? emptyText}
                            {'~'}
                            {endText ?? emptyText}
                        </Fragment>
                    )
                }
                return text ?? emptyText
            }
            if (mode === 'edit') {
                const needFieldProps = {
                    style: { minWidth: 120, ...fieldProps.style },
                    ...fieldProps
                }
                const renderDom = (
                    <Slider {...needFieldProps} v-slots={slots}/>
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
