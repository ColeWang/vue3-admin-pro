import { defineComponent, reactive } from 'vue'
import { Form, Number, Submitter, Text } from '@/components/form'

export default defineComponent({
    setup () {
        const model = reactive({
            text: '',
            number: 10
        })

        const rules = reactive({
            'text': [
                {
                    required: true,
                    message: 'Please input text'
                }
            ]
        })

        const { resetFields, validate, validateInfos } = Form.useForm(model, rules)

        function onSubmit () {
            validate().then(() => {
                console.log(model)
            })
        }

        function onReset () {
            resetFields()
        }

        return () => {
            return (
                <Form model={model}>
                    <Text
                        width={'sm'}
                        label={'文本'}
                        name={'text'}
                        {...validateInfos['text']}
                    />
                    <Number width={'sm'} label={'数字'} name={'number'}/>
                    <Submitter onSubmit={onSubmit} onReset={onReset}/>
                </Form>
            )
        }
    }
})
