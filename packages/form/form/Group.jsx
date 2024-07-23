import { defineComponent, unref } from 'vue'
import { Col, theme } from 'ant-design-vue'
import RowWrap from '../helpers/RowWrap'
import ColWrap from '../helpers/ColWrap'
import { useFormInstance } from '../base-form'
import { getPropsSlot } from '../../_utils/props-util'

function genTitleStyle (layout, token) {
    const baseStyle = {
        fontSize: token.fontSize,
        color: token.colorText,
        lineHeight: token.lineHeight,
        fontWeight: token.fontWeightStrong,
    }
    if (layout === 'inline') {
        const needPadding = token.size / 2
        return { ...baseStyle, paddingBlock: `${needPadding}px` }
    }
    return { ...baseStyle, paddingBlockEnd: `${token.size}px` }
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

            const rowWrapProps = { ...rowProps, grid: !!grid }

            return (
                <ColWrap span={24} grid={!!grid}>
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
