import { defineComponent } from 'vue'
import { EditableTable } from '@site'

export default defineComponent({
    inheritAttrs: false,
    name: 'ListEditableTable',
    setup () {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                valueType: 'text',
                formItemProps: {
                    required: true,
                    extra: '123'
                }
            },
            {
                title: 'Age',
                dataIndex: 'age',
                valueType: 'select',
                valueEnum: {
                    '1': '选项一',
                    '2': '选项二'
                },
                formItemProps: {
                    required: true
                }
            },
            {
                title: 'Address',
                dataIndex: 'address',
                valueType: 'text'
            }
        ]

        const dataSource = [
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

        return () => {
            const tableProps = {
                columns: columns,
                dataSource: dataSource
            }

            return (
                <EditableTable {...tableProps}/>
            )
        }
    }
})
