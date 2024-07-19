import { computed, defineComponent, unref } from 'vue'
import { Action, Table } from '@packages'

export default defineComponent({
    name: 'TableIndex',
    setup () {
        function onColumnsChange (values) {
            console.log(values)
        }

        const columns = computed(() => {
            return [
                {
                    title: 'Test',
                    search: true,
                    initialValue: '123',
                    dataIndex: ['data', 'test'],
                    hideInTable: true
                },
                {
                    title: 'Name',
                    search: true,
                    initialValue: '123',
                    dataIndex: 'name',
                    formItemProps: {
                        required: true
                    }
                },
                {
                    title: 'Age',
                    search: true,
                    dataIndex: 'age',
                    valueType: 'select',
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
                            <Action.Group max={3}>
                                <Action>操作1</Action>
                                <Action type={'error'}>操作2</Action>
                                <Action type={'warning'}>操作3</Action>
                                <Action>操作4</Action>
                                <Action>长长长长长长长长长长长长长长</Action>
                            </Action.Group>
                        )
                    }
                }
            ]
        })

        function request (params, paginate, filter, sort) {
            return new Promise((resolve) => {
                console.log(params)

                const data = [
                    {
                        key: '1',
                        name: 'John Brown',
                        age: '1',
                        address: 'New York No. 1 Lake Park',
                    },
                    {
                        key: '2',
                        name: 'Jim Green',
                        age: '2',
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
                columns: unref(columns),
                request: request,
                onColumnsChange: onColumnsChange
            }

            const tableSlots = {
                alert: () => {
                    return (
                        <Action.Group size={16}>
                            <Action>批量删除</Action>
                            <Action>批量删除</Action>
                        </Action.Group>
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
