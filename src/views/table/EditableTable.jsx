import { defineComponent } from 'vue'
import { EditableTable } from '@/components/table'

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
