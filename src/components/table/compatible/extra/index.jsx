import { defineComponent } from 'vue'
import { Card } from 'ant-design-vue'

export default defineComponent({
    inheritAttrs: false,
    props: {
        pageData: {
            type: Array,
            default: () => ([])
        }
    },
    setup (props, { slots }) {
        return () => {
            const { pageData } = props

            const slotScope = { pageData }
            const children = slots.default && slots.default(slotScope)

            const cardProps = {
                bodyStyle: {
                    paddingBlock: '12px',
                    paddingInline: '24px'
                },
                style: {
                    marginBottom: '16px'
                }
            }

            return (
                <Card {...cardProps}>{children}</Card>
            )
        }
    }
})
