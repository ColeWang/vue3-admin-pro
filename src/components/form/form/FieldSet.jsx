import { defineComponent } from 'vue'
import { useFormInstance } from '../base-form'

export default defineComponent({
    inheritAttrs: false,
    props: {
        name: {
            type: [String, Number, Array],
            default: undefined
        }
    },
    setup (props, { slots }) {
        const { model = {} } = useFormInstance()

        return () => {
            return slots.default && slots.default()
        }
    }
})
