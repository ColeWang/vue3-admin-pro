import { defineComponent, Fragment } from 'vue'
import { Slider } from 'ant-design-vue'
import baseFieldProps from '../props'
import { getSlotVNode } from '../../../utils/props-util'
import { isArray } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: { ...baseFieldProps },
    setup (props, { slots }) {
        return () => {
            const { mode, text, emptyText, fieldProps } = props

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
            const needFieldProps = {
                style: { minWidth: 120, ...fieldProps.style },
                ...fieldProps
            }
            const dom = <Slider {...needFieldProps} v-slots={slots}/>
            const slotScope = { text, props: { mode, ...fieldProps }, dom }
            const renderDom = getSlotVNode(slots, props, 'renderField', slotScope)
            return renderDom || dom
        }
    }
})
