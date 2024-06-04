import { defineComponent } from 'vue'
import { Card } from 'ant-design-vue'
import { default as Descs } from '@/components/descriptions'

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
                    <Descs title={'Descriptions'} bordered={true} model={model} size={'small'}>
                        <Descs.Item label={'select'}>
                            <Descs.Field
                                name={['deep', 'select']}
                                valueType={'select'}
                                valueEnum={valueEnum}
                            />
                        </Descs.Item>
                        <Descs.Item label={'treeSelect'}>
                            <Descs.Field
                                name={'treeSelect'}
                                valueType={'treeSelect'}
                                fieldProps={{ options }}
                            />
                        </Descs.Item>
                        <Descs.Item label={'cascader'}>
                            <Descs.Field
                                name={'cascader'}
                                valueType={'cascader'}
                                fieldProps={{ options }}
                            />
                        </Descs.Item>
                        <Descs.Item label={'radio'}>
                            <Descs.Field
                                name={'radio'}
                                valueType={'radio'}
                                valueEnum={valueEnum}
                            />
                        </Descs.Item>
                        <Descs.Item label={'checkbox'}>
                            <Descs.Field
                                name={'checkbox'}
                                valueType={'checkbox'}
                                valueEnum={valueEnum}
                            />
                        </Descs.Item>
                        <Descs.Item label={'switch'}>
                            <Descs.Field
                                name={'switch'}
                                valueType={'switch'}
                            />
                        </Descs.Item>
                        <Descs.Item label={'slider'}>
                            <Descs.Field
                                name={'slider'}
                                valueType={'slider'}
                            />
                        </Descs.Item>
                        <Descs.Item label={'number'}>
                            <Descs.Field
                                name={'number'}
                                valueType={'number'}
                            />
                        </Descs.Item>
                        <Descs.Item label={'textarea'}>
                            <Descs.Field
                                name={'textarea'}
                                valueType={'textarea'}
                            />
                        </Descs.Item>
                        <Descs.Item label={'password'}>
                            <Descs.Field
                                name={'password'}
                                valueType={'password'}
                            />
                        </Descs.Item>
                        <Descs.Item label={'text'}>
                            <Descs.Field
                                name={'text'}
                                valueType={'text'}
                            />
                        </Descs.Item>
                        <Descs.Item label={'date'}>
                            <Descs.Field
                                name={'date'}
                                valueType={'date'}
                            />
                        </Descs.Item>
                        <Descs.Item label={'dateRange'}>
                            <Descs.Field
                                name={'dateRange'}
                                valueType={'dateRange'}
                            />
                        </Descs.Item>
                    </Descs>
                </Card>
            )
        }
    }
})
