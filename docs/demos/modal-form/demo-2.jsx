import { defineComponent, ref, unref } from 'vue'
import { Button } from 'ant-design-vue'
import { ModalForm, Number, Text } from '@/components/form'

export default defineComponent({
    setup () {
        const modalFormRef = ref(null)

        function handleClick () {
            const context = unref(modalFormRef)
            context && context.open()
        }

        return () => {
            return (
                <div>
                    <Button onClick={handleClick}>新建表单</Button>
                    <ModalForm
                        ref={modalFormRef}
                        grid={true}
                        width={512}
                    >
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
                </div>
            )
        }
    }
})
