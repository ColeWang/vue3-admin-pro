import { defineComponent } from 'vue'
import { Field, Form } from '@/components/form'

export default defineComponent({
    setup () {
        return () => {
            return (
                <Form>
                    <Field text={'这是一段文本'} mode={'read'} valueType={'text'}/>
                </Form>
            )
        }
    }
})
