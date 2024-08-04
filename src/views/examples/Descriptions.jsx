import { defineComponent } from 'vue'
import { Button, Card, Space } from 'ant-design-vue'
import { Descriptions as Descs } from '@site'

export default defineComponent({
    inheritAttrs: false,
    name: 'ExamplesDescriptions',
    setup () {
        const valueEnum = {
            '1': '选项一',
            '2': {
                color: 'red',
                text: '选项二'
            },
        }

        const options = [
            {
                value: '1',
                label: 'Label 1',
                children: [
                    {
                        value: '1-1',
                        label: 'Label 1-1'
                    },
                    {
                        value: '1-2',
                        label: 'Label 1-2',
                    }
                ]
            },
            {
                value: '2',
                label: 'Label 2',
                children: [
                    {
                        value: '2-1',
                        label: 'Label 2-1',
                    },
                    {
                        value: '2-2',
                        label: 'Label 2-2',
                    }
                ]
            }
        ]

        function request () {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const data = {
                        column: 'text',
                        deep: { select: '2' }, // name path
                        treeSelect: ['1', '1-1'],
                        cascader: ['1'],
                        radio: '1',
                        checkbox: '1',
                        switch: true,
                        slider: [10, 90],
                        number: 0,
                        textarea: '这是一段很长很长很长很长的长长的文本',
                        password: '19203',
                        text: '文本',
                        date: Date.now(),
                        dateRange: [Date.now(), Date.now()]
                    }
                    resolve({ data })
                }, 1000)
            })
        }

        return () => {
            return (
                <Card>
                    <Descs
                        title={'Descriptions'}
                        request={request}
                        bordered={true}
                        size={'small'}
                        columns={[
                            {
                                title: 'column',
                                dataIndex: 'column',
                                valueType: 'text',
                                order: 9
                            }
                        ]}
                        v-slots={{
                            extra: () => (
                                <Space size={8}>
                                    <Button>链接</Button>
                                    <Button>链接</Button>
                                </Space>
                            )
                        }}
                    >
                        <Descs.Item
                            label={'select'}
                            name={['deep', 'select']}
                            valueType={'select'}
                            valueEnum={valueEnum}
                            order={10}
                        />
                        <Descs.Item
                            label={'treeSelect'}
                            name={'treeSelect'}
                            valueType={'treeSelect'}
                            fieldProps={{ options }}
                        />
                        <Descs.Item
                            label={'cascader'}
                            name={'cascader'}
                            valueType={'cascader'}
                            fieldProps={{ options }}
                        />
                        <Descs.Item
                            label={'radio'}
                            name={'radio'}
                            valueType={'radio'}
                            valueEnum={valueEnum}
                        />
                        <Descs.Item
                            label={'checkbox'}
                            name={'checkbox'}
                            valueType={'checkbox'}
                            valueEnum={valueEnum}
                        />
                        <Descs.Item
                            label={'switch'}
                            name={'switch'}
                            valueType={'switch'}
                        />
                        <Descs.Item
                            label={'slider'}
                            name={'slider'}
                            valueType={'slider'}
                        />
                        <Descs.Item
                            label={'number'}
                            name={'number'}
                            valueType={'number'}
                        />
                        <Descs.Item
                            label={'textarea'}
                            name={'textarea'}
                            valueType={'textarea'}
                        />
                        <Descs.Item
                            label={'password'}
                            name={'password'}
                            valueType={'password'}
                        />
                        <Descs.Item
                            label={'text'}
                            name={'text'}
                            valueType={'text'}
                            v-slots={{ a: () => '111' }}
                        />
                        <Descs.Item label={'test'}>
                            123
                        </Descs.Item>
                        <Descs.Item
                            label={'date'}
                            name={'date'}
                            valueType={'date'}
                        />
                        <Descs.Item
                            label={'dateRange'}
                            hide={true}
                            name={'dateRange'}
                            valueType={'dateRange'}
                        />
                        <Descs.Item label={'slotScope'}>
                            {(slotScope) => {
                                return slotScope.column
                            }}
                        </Descs.Item>
                    </Descs>
                </Card>
            )
        }
    }
})
