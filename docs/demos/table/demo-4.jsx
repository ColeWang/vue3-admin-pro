import { defineComponent } from 'vue'
import { Table } from '@/components/table'

export default defineComponent({
    setup () {
        const columns = [
            {
                title: 'Name',
                search: true,
                initialValue: '123',
                dataIndex: 'name'
            },
            {
                title: 'Age',
                search: true,
                dataIndex: 'age',
                valueType: 'select',
                valueEnum: {
                    '1': '选项一',
                    '2': '选项二'
                },
            },
            {
                title: 'Address',
                dataIndex: 'address'
            }
        ]
        
        function postData (data, params, paginate, filter, sort) {
            console.log('postData', data)
            return data
        }
        
        function beforeSearchSubmit (values) {
            return { ...values, test: '111' }
        }

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
                columns: columns,
                request: request,
                beforeSearchSubmit: beforeSearchSubmit,
                postData: postData
            }

            return (
                <div>
                    <Table {...tableProps}/>
                </div>
            )
        }
    }
})
