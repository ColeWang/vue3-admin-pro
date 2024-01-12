import { defineComponent, reactive } from 'vue'
import { Button } from 'ant-design-vue'
import { DatePicker, Form, Number, Select, Text } from '@/components/form'

export default defineComponent({
    setup () {
        const model = reactive({})

        const initialValues = {
            text: 'default name'
        }

        function onValuesChange (values) {
            console.log(values)
        }

        function onSubmit (evt) {
            console.log(evt)
            console.log(model)
        }

        return () => {
            return (
                <Form
                    model={model}
                    initialValues={initialValues}
                    onValuesChange={onValuesChange}
                    onSubmit={onSubmit}
                >
                    <Text
                        width={365}
                        label={'文本'}
                        name={'text'}
                        required={true}
                    />
                    <Number
                        width={'sm'}
                        label={'数字'}
                        name={'number'}
                    />
                    <DatePicker
                        width={'sm'}
                        label={'时间'}
                        name={'datePicker'}
                    />
                    <Select
                        width={'sm'}
                        label={'选择'}
                        name={'select'}
                        valueEnum={{ '1': '选项一', '2': '选项二' }}
                    />
                    <Button html-type={'submit'}>提交</Button>
                </Form>
            )
        }
    }
})
