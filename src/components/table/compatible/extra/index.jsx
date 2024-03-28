import { defineComponent } from 'vue'
import { Card } from 'ant-design-vue'

export default defineComponent({
    inheritAttrs: false,
    setup (props, { slots }) {
        return () => {
            const cardProps = {
                bodyStyle: {
                    paddingBlock: '24px',
                    paddingInline: '24px'
                },
                style: {
                    marginBottom: '16px'
                }
            }

            const children = slots.default && slots.default()

            return <Card {...cardProps}>{children}</Card>
        }
    }
})
