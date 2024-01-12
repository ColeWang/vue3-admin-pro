import { defineComponent, ref, unref } from 'vue'
import { Navbar } from '@/packages/index.mjs'

export default defineComponent({
    setup () {
        const collapsed = ref(false)

        function onChange (value) {
            collapsed.value = value
        }

        return () => {
            return (
                <Navbar collapsed={unref(collapsed)} onChange={onChange}/>
            )
        }
    }
})
