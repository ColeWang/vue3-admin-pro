import { defineComponent } from 'vue'
import { Table } from '@/components/table'

export default defineComponent({
    setup () {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name'
            },
            {
                title: 'Age',
                dataIndex: 'age'
            },
            {
                title: 'Address',
                dataIndex: 'address'
            }
        ]

        function request (params, paginate, filter, sort) {
            return new Promise((resolve) => {
                console.log(params)

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
                search: false,
                columns: columns,
                request: request
            }

            return (
                <div>
                    <Table {...tableProps}/>
                </div>
            )
        }
    }
})
