import { defineComponent, ref, unref } from 'vue'
import { Card } from 'ant-design-vue'
import { QueryFilter, Select, Text } from '@/components/form'
import { Action, Table } from '@/components/table'

export default defineComponent({
    name: 'TableCustomSearch',
    setup () {
        const model = ref({ age: '1', name: '123' })

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name'
            },
            {
                title: 'Age',
                dataIndex: 'age',
            },
            {
                title: 'Address',
                dataIndex: 'address'
            },
            {
                title: 'Action',
                customRender: () => {
                    return (
                        <Action>
                            <Action.Item>操作</Action.Item>
                        </Action>
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
                        age: 32,
                        address: 'New York No. 1 Lake Park',
                    },
                    {
                        key: '2',
                        name: 'Jim Green',
                        age: 42,
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
                request: request
            }

            const tableSlots = {
                search: (slotScope) => {
                    console.log(slotScope)
                    const cardProps = {
                        bodyStyle: {
                            paddingInline: '24px'
                        },
                        style: {
                            marginBottom: '16px'
                        }
                    }
                    const queryFilterProps = {
                        ...slotScope,
                        model: unref(model)
                    }
                    const queryFilterSlots = {
                        default: ({ props: slotProps }) => {
                            return [
                                <Select
                                    label={'Age'}
                                    name={'age'}
                                    valueEnum={{
                                        '1': '选项一',
                                        '2': '选项二',
                                    }}
                                    formItemProps={slotProps}
                                />,
                                <Text
                                    hidden={unref(model).age && unref(model).age === '1'}
                                    label={'Name'}
                                    name={'name'}
                                    required={true}
                                    formItemProps={slotProps}
                                />
                            ]
                        }
                    }
                    return (
                        <Card {...cardProps}>
                            <QueryFilter {...queryFilterProps} v-slots={queryFilterSlots}/>
                        </Card>
                    )
                }
            }

            return (
                <div>
                    <Table {...tableProps} v-slots={tableSlots}/>
                </div>
            )
        }
    }
})