import { defineComponent } from 'vue'
import { Row } from 'ant-design-vue'
import { pick } from 'lodash-es'

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
            const { grid } = props
            const children = slots.default && slots.default()

            if (grid) {
                const rowProps = pick(props, Object.keys(Row.props))
                return <Row {...rowProps}>{children}</Row>
            }
            return children
        }
    }
})
