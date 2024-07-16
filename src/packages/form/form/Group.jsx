import { defineComponent, unref } from 'vue'
import { Col } from 'ant-design-vue'
import RowWrap from '../helpers/RowWrap'
import ColWrap from '../helpers/ColWrap'
import { useFormInstance } from '../base-form'
import { getPropsSlot } from '../../_utils/props-util'

function genTitleStyle (layout) {
    if (layout === 'inline') {
        return {
            paddingBlock: '8px',
            fontWeight: 'bold'
        }
    }
    return {
        paddingBottom: '12px',
        fontWeight: 'bold'
    }
}

export default defineComponent({
    inheritAttrs: false,
    props: {
        title: {
            type: [String, Function],
            default: undefined
        }
    },
    setup (props, { slots }) {
        const { formProps = {} } = useFormInstance()

        return () => {
            const { layout = 'vertical', grid, rowProps = {} } = unref(formProps)

            const titleDom = getPropsSlot(slots, props, 'title')
            const titleStyle = genTitleStyle(layout)

            const colWrapProps = {
                span: 24,
                grid: !!grid
            }
            const rowWrapProps = {
                ...rowProps,
                grid: !!grid
            }
            return (
                <ColWrap {...colWrapProps}>
                    <RowWrap {...rowWrapProps}>
                        {titleDom && (
                            <Col span={24}>
                                <div style={titleStyle}>
                                    {titleDom}
                                </div>
                            </Col>
                        )}
                        {slots.default && slots.default()}
                    </RowWrap>
                </ColWrap>
            )
        }
    }
})
