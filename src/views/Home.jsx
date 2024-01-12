import { defineComponent } from 'vue'
import { Empty } from 'ant-design-vue'

export default defineComponent({
    setup () {
        return () => {
            return (
                <div>
                    <Empty/>
                </div>
            )
        }
    }
})
