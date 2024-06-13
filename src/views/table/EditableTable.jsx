import { defineComponent } from 'vue'
import { EditableTable } from '@/packages/table'

export default defineComponent({
    inheritAttrs: false,
    setup () {
        return () => {
            return (
                <EditableTable/>
            )
        }
    }
})
