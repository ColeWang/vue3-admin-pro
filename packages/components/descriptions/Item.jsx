import { defineComponent } from 'vue'
import { Descriptions, Form } from 'ant-design-vue'
import { BaseField } from '../base-field'

export default defineComponent({
    inheritAttrs: false,
    name: 'DescriptionsItem',
    props: {
        ...BaseField.props,
        ...Form.Item.props,
        ...Descriptions.Item.props,
        hide: {
            type: Boolean,
            default: false
        },
        order: {
            type: Number,
            default: undefined
        }
    },
    setup (_, { slots }) {
        return () => {
            return slots.default && slots.default()
        }
    }
})
