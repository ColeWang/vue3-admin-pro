import { defineComponent } from 'vue'
import { Spin } from 'ant-design-vue'

export default defineComponent({
    inheritAttrs: false,
    setup () {
        return () => {
            return (
                <div>
                    <Spin/>
                </div>
            )
        }
    }
})
