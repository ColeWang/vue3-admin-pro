import { defineComponent, computed, unref } from 'vue'
import { Table, Action } from '@/components/table'
import { useLocaleReceiver } from '@/components/locale-provider'

export default defineComponent({
    name: 'TableIndex',
    setup () {
        const { t } = useLocaleReceiver('Form')

        function onColumnsChange (values) {
            console.log(values)
        }

        const columns = computed(() => {
            return [
                {
                    title: t('collapsed'),
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
                            <Action.Group>
                                <Action>操作1</Action>
                                <Action>操作2</Action>
                                <Action>操作3</Action>
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
                // console.log(params)

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

            return (
                <div>
                    <Table {...tableProps}/>
                </div>
            )
        }
    }
})