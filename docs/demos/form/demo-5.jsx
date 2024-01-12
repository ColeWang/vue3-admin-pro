import { defineComponent, ref, unref } from 'vue'
import { Form, Number, Submitter, Text } from '@/components/form'

export default defineComponent({
    setup () {
        const formRef = ref(null)

        function onFormFinish (values) {
            console.log(values)
        }

        function onSubmit () {
            const context = unref(formRef)
            if (context && context.getFormInstance) {
                const formInstance = context.getFormInstance()
                formInstance.submit()
            }
        }

        function onReset () {
            const context = unref(formRef)
            if (context && context.getFormInstance) {
                const formInstance = context.getFormInstance()
                formInstance.resetForm()
            }
        }

        return () => {
            return (
                <Form ref={formRef} onFinish={onFormFinish}>
                    <Text width={'sm'} label={'文本'} name={'text'}/>
                    <Number width={'sm'} label={'数字'} name={'number'}/>
                    <Submitter onSubmit={onSubmit} onReset={onReset}/>
                </Form>
            )
        }
    }
})
