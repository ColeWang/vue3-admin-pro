import { defineComponent, ref, unref } from 'vue'
import { Button } from 'ant-design-vue'
import Transition from '@/components/transition'
import svg from '@/components/table/components/toolbar/image/holder.svg'

const a = {
    value: window.btoa('<svg viewBox="64 64 896 896" version="1.1" xmlns="http://www.w3.org/2000/svg" focusable="false" fill="rgba(0, 0, 0, 0.65)"><path d="M300 276.5a56 56 0 1056-97 56 56 0 00-56 97zm0 284a56 56 0 1056-97 56 56 0 00-56 97zM640 228a56 56 0 10112 0 56 56 0 00-112 0zm0 284a56 56 0 10112 0 56 56 0 00-112 0zM300 844.5a56 56 0 1056-97 56 56 0 00-56 97zM640 796a56 56 0 10112 0 56 56 0 00-112 0z"/></svg>')
}

console.log(a)
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