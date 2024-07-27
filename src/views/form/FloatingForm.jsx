import { defineComponent } from 'vue'

export default defineComponent({
    inheritAttrs: false,
    name: 'FormFloatingForm',
    setup () {
        return () => {
            return (
                <div>浮层表单</div>
            )
        }
    }
})
