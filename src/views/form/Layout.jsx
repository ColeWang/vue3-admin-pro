import { defineComponent, Fragment, ref, unref } from 'vue'
import { Card, Radio } from 'ant-design-vue'
import { Form, Number, Text } from '@/components/form'

export default defineComponent({
    name: 'FormLayout',
    setup () {
        const layout = ref('horizontal')
        const span = ref(6)

        return () => {
            return (
                <Fragment>
                    <Card title={'基本布局'}>
                        <div style={{ marginBottom: '24px' }}>
                            <Radio.Group v-model={[layout.value, 'value']}>
                                <Radio.Button value={'horizontal'}>horizontal</Radio.Button>
                                <Radio.Button value={'vertical'}>vertical</Radio.Button>
                                <Radio.Button value={'inline'}>inline</Radio.Button>
                            </Radio.Group>
                        </div>
                        <Form layout={unref(layout)}>
                            <Text width={'sm'} label={'文本'}/>
                            <Number width={'sm'} label={'数字'}/>
                            <Form.Group title={'表单组'}>
                                <Text width={'xs'} label={'文本'}/>
                                <Number width={'xs'} label={'数字'}/>
                            </Form.Group>
                        </Form>
                    </Card>
                    <Card title={'栅格化布局'} style={{ marginTop: '18px' }}>
                        <div style={{ marginBottom: '24px' }}>
                            <Radio.Group v-model={[span.value, 'value']}>
                                <Radio.Button value={6}>6</Radio.Button>
                                <Radio.Button value={12}>12</Radio.Button>
                                <Radio.Button value={24}>24</Radio.Button>
                            </Radio.Group>
                        </div>
                        <Form grid={true} layout={unref(layout)}>
                            <Text label={'文本'} name={'text'} colProps={{ span: unref(span) }}/>
                            <Number label={'数字'} colProps={{ span: unref(span) }}/>
                            <Text label={'文本'} colProps={{ span: unref(span) }}/>
                            <Number label={'数字'} colProps={{ span: unref(span) }}/>
                            <Form.Group title={'表单组'}>
                                <Text label={'文本'} colProps={{ span: unref(span) }}/>
                                <Number label={'数字'} colProps={{ span: unref(span) }}/>
                                <Text label={'文本'} colProps={{ span: unref(span) }}/>
                                <Number label={'数字'} colProps={{ span: unref(span) }}/>
                            </Form.Group>
                            <Form.Dependency name={['text']} v-slots={{
                                default: ({ text }) => {
                                    return text
                                }
                            }}/>
                        </Form>
                    </Card>
                </Fragment>
            )
        }
    }
})
