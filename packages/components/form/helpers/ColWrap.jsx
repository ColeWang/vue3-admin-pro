import { defineComponent } from 'vue'
import { Col } from 'ant-design-vue'
import { pick } from 'lodash-es'

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
            const { grid } = props
            const children = slots.default && slots.default()

            if (grid) {
                const colProps = pick(props, Object.keys(Col.props))
                if (!colProps.span && !colProps.xs) {
                    colProps.xs = 24
                }
                return <Col {...colProps}>{children}</Col>
            }
            return children
        }
    }
})
