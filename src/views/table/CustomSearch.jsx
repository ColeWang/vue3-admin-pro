import { defineComponent, ref, unref } from 'vue'
import { CustomFields } from '@/packages/base-field'
import { HocField, Radio, Select } from '@/packages/form'
import { Action, ActionGroup, BaseSearch, Table } from '@/packages/table'

const Test = HocField('test')

export default defineComponent({
    name: 'TableCustomSearch',
    setup () {
        const model = ref({
            radio: '1'
        })

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name'
            },
            {
                title: 'Radio',
                dataIndex: 'radio',
                valueEnum: {
                    '1': '选项一',
                    '2': '选项二'
                }
            },
            {
                title: 'Address',
                dataIndex: 'address'
            },
            {
                title: 'Action',
                customRender: () => {
                    return (
                        <ActionGroup>
                            <Action>操作</Action>
                        </ActionGroup>
                    )
                }
            }
        ]

        function request (params, paginate, filter, sort) {
            return new Promise((resolve) => {
                console.log(params)
                console.log(unref(model))

                const data = [
                    {
                        key: '1',
                        name: 'John Brown',
                        radio: '1',
                        address: 'New York No. 1 Lake Park',
                    },
                    {
                        key: '2',
                        name: 'Jim Green',
                        radio: ['2', '1'],
                        address: 'London No. 1 Lake Park',
                    }
                ]

                setTimeout(() => {
                    resolve({ data: data })
                }, 1000)
            })
        }

        return () => {
            const tableProps = {
                columns: columns,
                request: request,
                rowSelection: true,
                // options: false
            }

            return (
                <div>
                    <CustomFields valueTypeMap={{
                        test: ({ props, slots }) => {
                            return '123'
                        }
                    }}>
                        <Table {...tableProps} v-slots={{
                            search: (slotScope) => (
                                <BaseSearch {...slotScope} span={12} model={unref(model)}>
                                    <Select
                                        label={'Age'}
                                        name={['data', 'age']}
                                        required={true}
                                        valueEnum={{
                                            '1': '选项一',
                                            '2': '选项二',
                                        }}
                                    />
                                    <Radio
                                        label={'Radio'}
                                        name={'radio'}
                                        required={true}
                                        fieldProps={{ optionType: 'button' }}
                                        valueEnum={{
                                            '1': '选项一',
                                            '2': '选项二',
                                        }}
                                    />
                                    <Test
                                        label={'Test'}
                                        labelWidth={150}
                                        name={'test'}
                                    />
                                </BaseSearch>
                            )
                        }}/>
                    </CustomFields>
                </div>
            )
        }
    }
})
