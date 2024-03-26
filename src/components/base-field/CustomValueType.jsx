import { defineComponent } from 'vue'

export default defineComponent({
    inheritAttrs: false,
    props: {
        valueTypeMap: {
            type: Object,
            default: () => ({})
        }
    },
    setup (props, { slots }) {
        return () => {
            return slots.default && slots.default()
        }
    }
})
