import { defineComponent } from 'vue'

// @todo 表单列表 开发中
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
