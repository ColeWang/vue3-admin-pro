import { defineComponent, ref, unref } from 'vue'
import { Button } from 'ant-design-vue'
import Transition from '@/components/transition'

export default defineComponent({
    name: 'TestIndex',
    setup () {
        const open = ref(true)

        function onClick () {
            open.value = !unref(open)
        }

        return () => {
            return (
                <div>
                    <Button onClick={onClick}>展开/收起</Button>
                    <Transition appear={true}>
                        <div v-show={unref(open)}>
                            <div style={{ background: 'pink' }}>
                                <div>111111111111111</div>
                                <div>111111111111111</div>
                                <div>111111111111111</div>
                                <div>111111111111111</div>
                                <div>111111111111111</div>
                                <div>111111111111111</div>
                                <div>111111111111111</div>
                                <div>111111111111111</div>
                            </div>
                        </div>
                    </Transition>
                </div>
            )
        }
    }
})