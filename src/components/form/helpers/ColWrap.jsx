import { defineComponent, Fragment } from 'vue'
import { Col } from 'ant-design-vue'
import { clone, isUndefined } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...Col.props,
        grid: {
            type: Boolean,
            default: false
        }
    },
    setup (props, { slots }) {
        return () => {
            const { grid, ...restProps } = props
            const children = slots.default && slots.default()

            const originProps = clone(restProps)
            if (isUndefined(originProps.span) && isUndefined(originProps.xs)) {
                originProps.xs = 24
            }
            if (!grid) return (<Fragment>{children}</Fragment>)
            return (
                <Col {...originProps}>{children}</Col>
            )
        }
    }
})
