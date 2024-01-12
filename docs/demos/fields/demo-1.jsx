import { defineComponent } from 'vue'
import { DatePicker, Form, Number, RangePicker, Select, Text, TextArea } from '@/components/form'

export default defineComponent({
    setup () {
        return () => {
            return (
                <Form>
                    <Form.Group>
                        <Text
                            width={'sm'}
                            label={'Text'}
                            name={'name'}
                            placeholder={'自定义 Placeholder'}
                        />
                        <Number
                            width={'sm'}
                            label={'Number'}
                            name={'number'}
                            required={true}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Select
                            width={'xs'}
                            label={'Select'}
                            name={'select'}
                            valueEnum={{
                                '1': '选项一',
                                '2': '选项二'
                            }}
                        />
                        <DatePicker
                            width={'xs'}
                            label={'Date'}
                            name={'date'}
                        />
                        <RangePicker
                            width={'sm'}
                            label={'DateRange'}
                            name={'dateRange'}
                        />
                    </Form.Group>
                    <TextArea
                        width={'lg'}
                        label={'TextArea'}
                        name={'textarea'}
                    />
                </Form>
            )
        }
    }
})