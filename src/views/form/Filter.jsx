import { defineComponent } from 'vue'
import { Card } from 'ant-design-vue'
import { Number, QueryFilter, Select, Text } from '@/components/form'

export default defineComponent({
    setup () {
        return () => {
            const queryFilterSlots = {
                default: (slotScope) => {
                    return [
                        <Text
                            label={'文本'}
                            name={'text'}
                            formItemProps={slotScope.props}
                        />,
                        <Text
                            label={'文本'}
                            name={'text'}
                            formItemProps={slotScope.props}
                        />,
                        <Number
                            label={'数字'}
                            name={'number'}
                            formItemProps={slotScope.props}
                        />,
                        <Number
                            label={'数字'}
                            name={'number'}
                            formItemProps={slotScope.props}
                        />,
                        <Select
                            label={'选择'}
                            name={'select'}
                            formItemProps={slotScope.props}
                        />
                    ]
                }
            }

            return (
                <Card>
                    <QueryFilter v-slots={queryFilterSlots}/>
                </Card>
            )
        }
    }
})