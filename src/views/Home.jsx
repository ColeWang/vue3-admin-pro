import { computed, defineComponent, unref } from 'vue'
import { Table } from '@/components/table'

export default defineComponent({
    name: 'HomeIndex',
    setup () {
        const columns = computed(() => {
            return [
                {
                    title: 'Name',
                    search: true,
                    copyable: true,
                    dataIndex: 'name'
                },
                {
                    title: 'Age',
                    search: true,
                    dataIndex: 'age'
                },
                {
                    title: 'AAAAAA',
                    search: true,
                    dataIndex: 'aaa'
                },
                {
                    title: 'BBBBBB',
                    search: true,
                    dataIndex: 'bbb'
                },
                {
                    title: 'CCCCCC',
                    search: true,
                    dataIndex: 'ccc'
                },
            ]
        })

        function request (params, paginate, filter, sort) {
            return new Promise((resolve) => {
                const data = [
                    {
                        key: '1',
                        name: 'John Brown',
                        age: 32
                    },
                    {
                        key: '2',
                        name: 'Jim Green',
                        age: 42
                    }
                ]

                setTimeout(() => {
                    resolve({ data: data })
                }, 500)
            })
        }

        return () => {
            const tableProps = {
                columns: unref(columns),
                request: request,
                search: {
                    showCollapse: true
                }
            }

            return (
                <Table {...tableProps}/>
            )
        }
    }
})
