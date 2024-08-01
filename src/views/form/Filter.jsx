import { defineComponent } from 'vue'
import { Card } from 'ant-design-vue'
import { Number, QueryFilter, Select, Text } from '@site'

export default defineComponent({
    inheritAttrs: false,
    name: 'FormFilter',
    setup () {
        function onSubmit (values) {
            console.log(values)
        }

        return () => {
            return (
                <Card>
                    <QueryFilter showCollapse={true} onSubmit={onSubmit}>
                        {(slotScope) => {
                            return [
                                <Text
                                    label={'文本1'}
                                    name={'text1'}
                                    formItemProps={slotScope.props}
                                />,
                                <Text
                                    label={'文本2'}
                                    name={'text2'}
                                    formItemProps={slotScope.props}
                                />,
                                <Number
                                    label={'数字1'}
                                    name={'number1'}
                                    formItemProps={slotScope.props}
                                />,
                                <Number
                                    label={'数字2'}
                                    name={'number2'}
                                    formItemProps={slotScope.props}
                                />,
                                <Select
                                    hidden={true}
                                    label={'选择'}
                                    name={'select'}
                                    formItemProps={slotScope.props}
                                />
                            ]
                        }}
                    </QueryFilter>
                </Card>
            )
        }
    }
})
