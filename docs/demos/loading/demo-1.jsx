import { defineComponent } from 'vue'
import { Button } from 'ant-design-vue'
import Loading from '@/components/loading'

export default defineComponent({
    setup () {
        function onClick () {
            const destroy = Loading()
            setTimeout(() => {
                destroy && destroy()
            }, 2000)
        }

        return () => {
            return (<Button onClick={onClick}>点击加载</Button>)
        }
    }
})