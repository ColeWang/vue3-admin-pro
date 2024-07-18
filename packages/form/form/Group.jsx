import { defineComponent, unref } from 'vue'
import { Col, theme } from 'ant-design-vue'
import RowWrap from '../helpers/RowWrap'
import ColWrap from '../helpers/ColWrap'
import { useFormInstance } from '../base-form'
import { getPropsSlot } from '../../_utils/props-util'
import { toPx } from '../../_utils/util'

function genTitleStyle (layout, token) {
    const baseStyle = { fontWeight: 'bold' }
    if (layout === 'inline') {
        return { ...baseStyle, paddingBlock: toPx(token.padding / 2) }
    }
    return { ...baseStyle, paddingBlockEnd: toPx(token.paddingLG / 2) }
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
        const { token } = theme.useToken()
        const { formProps = {} } = useFormInstance()

        return () => {
            const { layout = 'vertical', grid, rowProps = {} } = unref(formProps)

            const titleDom = getPropsSlot(slots, props, 'title')
            const titleStyle = genTitleStyle(layout, unref(token))

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
