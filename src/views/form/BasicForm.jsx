import { defineComponent } from 'vue'

export default defineComponent({
    inheritAttrs: false,
    name: 'FormBasicForm',
    setup () {
        return () => {
            return (
                <div>基础表单</div>
            )
        }
    }
})
