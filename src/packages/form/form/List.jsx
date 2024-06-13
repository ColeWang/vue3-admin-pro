import { defineComponent } from 'vue'

// @todo 列表支持
export default defineComponent({
    inheritAttrs: false,
    props: {
        name: {
            type: String,
            default: undefined
        }
    },
    setup () {
        return () => {
            return (
                <div></div>
            )
        }
    }
})
