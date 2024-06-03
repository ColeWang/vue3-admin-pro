import { defineComponent } from 'vue'
import { Card } from 'ant-design-vue'
import Desc from '@/components/desc'

export default defineComponent({
    inheritAttrs: false,
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

        const model = {
            deep: { select: '2' }, // name path
            treeSelect: ['1', '1-1'],
            cascader: ['1'],
            radio: '1',
            checkbox: '1',
            switch: true,
            slider: [10, 90],
            number: 9010,
            textarea: '这是一段很长很长很长很长的长长的文本',
            password: '19203',
            text: '文本',
            date: Date.now(),
            dateRange: [Date.now(), Date.now()]
        }

        return () => {
            return (
                <Card>
                    <Desc title={'Descriptions'} model={model}>
                        <Desc.Item label={'select'}>
                            <Desc.Field
                                name={['deep', 'select']}
                                valueType={'select'}
                                valueEnum={valueEnum}
                            />
                        </Desc.Item>
                        <Desc.Item label={'treeSelect'}>
                            <Desc.Field
                                name={'treeSelect'}
                                valueType={'treeSelect'}
                                fieldProps={{ options }}
                            />
                        </Desc.Item>
                        <Desc.Item label={'cascader'}>
                            <Desc.Field
                                name={'cascader'}
                                valueType={'cascader'}
                                fieldProps={{ options }}
                            />
                        </Desc.Item>
                        <Desc.Item label={'radio'}>
                            <Desc.Field
                                name={'radio'}
                                valueType={'radio'}
                                valueEnum={valueEnum}
                            />
                        </Desc.Item>
                        <Desc.Item label={'checkbox'}>
                            <Desc.Field
                                name={'checkbox'}
                                valueType={'checkbox'}
                                valueEnum={valueEnum}
                            />
                        </Desc.Item>
                        <Desc.Item label={'switch'}>
                            <Desc.Field
                                name={'switch'}
                                valueType={'switch'}
                            />
                        </Desc.Item>
                        <Desc.Item label={'slider'}>
                            <Desc.Field
                                name={'slider'}
                                valueType={'slider'}
                            />
                        </Desc.Item>
                        <Desc.Item label={'number'}>
                            <Desc.Field
                                name={'number'}
                                valueType={'number'}
                            />
                        </Desc.Item>
                        <Desc.Item label={'textarea'}>
                            <Desc.Field
                                name={'textarea'}
                                valueType={'textarea'}
                            />
                        </Desc.Item>
                        <Desc.Item label={'password'}>
                            <Desc.Field
                                name={'password'}
                                valueType={'password'}
                            />
                        </Desc.Item>
                        <Desc.Item label={'text'}>
                            <Desc.Field
                                name={'text'}
                                valueType={'text'}
                            />
                        </Desc.Item>
                        <Desc.Item label={'date'}>
                            <Desc.Field
                                name={'date'}
                                valueType={'date'}
                            />
                        </Desc.Item>
                        <Desc.Item label={'dateRange'}>
                            <Desc.Field
                                name={'dateRange'}
                                valueType={'dateRange'}
                            />
                        </Desc.Item>
                    </Desc>
                </Card>
            )
        }
    }
})
