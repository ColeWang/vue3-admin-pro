import { defineComponent, ref, unref } from 'vue'
import { Radio } from 'ant-design-vue'
import { Form, Number, Text } from '@/components/form'

export default defineComponent({
    setup () {
        const span = ref(6)

        return () => {
            return (
                <div>
                    <div style={{ marginBottom: '24px' }}>
                        <span>Span: </span>
                        <Radio.Group v-model={[span.value, 'value']}>
                            <Radio.Button value={6}>6</Radio.Button>
                            <Radio.Button value={12}>12</Radio.Button>
                            <Radio.Button value={24}>24</Radio.Button>
                        </Radio.Group>
                    </div>
                    <Form grid={true}>
                        <Text label={'文本'} colProps={{ span: unref(span) }}/>
                        <Number label={'数字'} colProps={{ span: unref(span) }}/>
                        <Text label={'文本'} colProps={{ span: unref(span) }}/>
                        <Number label={'数字'} colProps={{ span: unref(span) }}/>
                    </Form>
                </div>
            )
        }
    }
})