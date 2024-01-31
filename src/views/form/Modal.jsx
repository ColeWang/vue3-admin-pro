import { defineComponent } from 'vue'
import { Button, Card } from 'ant-design-vue'
import { ModalForm, Number, Text } from '@/components/form'

export default defineComponent({
    name: 'FormModal',
    setup () {
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
                    <ModalForm
                        grid={true}
                        width={512}
                        onFinish={onFinish}
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
                    </ModalForm>
                </Card>
            )
        }
    }
})