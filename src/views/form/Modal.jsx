import { defineComponent, ref, unref } from 'vue'
import { Button, Card, Input } from 'ant-design-vue'
import { ModalForm, Number, Text, FieldCustom } from '@/components/form'

export default defineComponent({
    name: 'FormModal',
    setup () {
        const open = ref(false)

        function onClick () {
            open.value = !unref(open)
        }

        function onValuesChange (values) {
            console.log('cole', values)
        }

        function onFinish (values) {
            console.log(values)
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true)
                }, 1000)
            })
        }

        return () => {
            return (
                <Card>
                    <Button onClick={onClick}>新建表单</Button>
                    <ModalForm
                        v-model:open={open.value}
                        grid={true}
                        width={800}
                        onFinish={onFinish}
                        onValuesChange={onValuesChange}
                        v-slots={{
                            trigger: () => {
                                return <Button>新建表单</Button>
                            }
                        }}
                    >
                        <Text
                            label={'文本'}
                            name={'text'}
                            colProps={{ span: 24 }}
                        />
                        <Text
                            label={'文本'}
                            name={'text'}
                            colProps={{ span: 12 }}
                        />
                        <Number
                            label={'数字'}
                            name={'number'}
                            colProps={{ span: 12 }}
                        />
                        <FieldCustom colProps={{ span: 12 }} label={'自定义'} name={'custom'}>
                            <Input/>
                        </FieldCustom>
                    </ModalForm>
                </Card>
            )
        }
    }
})