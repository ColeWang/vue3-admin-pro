import { defineComponent, Fragment } from 'vue'
import { Row } from 'ant-design-vue'

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...Row.props,
        grid: {
            type: Boolean,
            default: false
        }
    },
    setup (props, { slots }) {
        return () => {
            const { grid, ...restProps } = props
            const children = slots.default ? slots.default() : null

            if (!grid) return (<Fragment>{children}</Fragment>)
            return (
                <Row {...restProps}>{children}</Row>
            )
        }
    }
})
