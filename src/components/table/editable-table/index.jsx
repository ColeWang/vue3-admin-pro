import { defineComponent } from 'vue'

export default defineComponent({
    inheritAttrs: false,
    setup (props, { slots }) {
        return () => {
            return (
                <div>开发中</div>
            )
        }
    }
})
