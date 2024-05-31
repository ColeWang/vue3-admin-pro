import { defineComponent } from 'vue'

// @todo 拦截 field 的变化, 整合成一个新的对象
export default defineComponent({
    inheritAttrs: false,
    setup () {
        return () => {
            return (
                <div></div>
            )
        }
    }
})
