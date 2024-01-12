import { defineComponent, ref, unref } from 'vue'
import { Radio } from 'ant-design-vue'
import { Form, Text, Number } from '@/components/form'


export default defineComponent({
    setup () {
        const layout = ref('horizontal')

        return () => {
            return (
                <Form layout={unref(layout)}>
                    <Form.Item label={'标签布局'}>
                        <Radio.Group v-model={[layout.value, 'value']}>
                            <Radio.Button value={'horizontal'}>horizontal</Radio.Button>
                            <Radio.Button value={'vertical'}>vertical</Radio.Button>
                            <Radio.Button value={'inline'}>inline</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Text width={'sm'} label={'文本'}/>
                    <Number width={'sm'} label={'数字'}/>
                    <Form.Group title={'表单组'}>
                        <Text width={'xs'} label={'文本'}/>
                        <Number width={'xs'} label={'数字'}/>
                    </Form.Group>
                </Form>
            )
        }
    }
})
