import { defineComponent } from 'vue'
import { Form, Number } from '@/components/form'

export default defineComponent({
    setup () {
        return () => {
            return (
                <Form>
                    <Number width={'sm'} label={'数字'} name={'number'}/>
                    <Form.Item noStyle={true} v-slots={{
                        default: (form) => {
                            return (
                                <div style={{ color: 'blue' }}>
                                    输入的数字是: {form && form.getFieldValue('number')}
                                </div>
                            )
                        }
                    }}/>
                </Form>
            )
        }
    }
})
