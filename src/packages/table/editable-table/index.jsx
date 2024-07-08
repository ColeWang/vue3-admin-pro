import { defineComponent, reactive, watch } from 'vue'
import { Field, Form } from '@/packages/form'
import Table from '../table'
import { omit, pick } from 'lodash-es'

const editable = {
    type: 'multiple', // 可编辑表格的类型，单行编辑或者多行编辑
    editableKeys: [], // 正在编辑的行，受控属性。 默认 key 会使用 rowKey 的配置
    onChange: (editableKeys, editableRows) => {
    },
    onSave: (key, row, originRow, newLine) => {
    }, // Promise
    onDelete: (key, row) => {
    }, // Promise
}

// @todo 编辑表格 开发中
export default defineComponent({
    inheritAttrs: false,
    props: {
        ...Table.props,
        editable: {
            type: Object,
            default: () => ({})
        },
        controlled: {
            type: Boolean,
            default: false
        },
        onChange: {}
    },
    emits: ['update:value'],
    setup (props, { emit, slots }) {
        const model = reactive(props.dataSource || [])

        watch(model, (value) => {
            console.log(value)
            emit('update:value', value)
        }, { deep: true, immediate: true })

        function onValidate (name, status, errors) {
            console.log(name, status, errors)
        }

        function customRender ({ text, record, index, column }) {
            const { fieldProps, formItemProps } = column
            const namePath = column.key || column.dataIndex

            const needFormItemProps = {
                ...omit(formItemProps, ['label']),
                name: [index, namePath],
                noStyle: true
            }
            const needFieldProps = {
                ...pick(column, Object.keys(Field.props)),
                fieldProps: { ...fieldProps, style: { width: '100%' } },
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps}/>
        }

        return () => {
            const { columns: propsColumns } = props

            const columns = propsColumns.map((column) => {
                return { ...column, customRender }
            })

            const tableProps = {
                ...pick(props, Object.keys(Table.props)),
                columns: columns,
                pagination: false,
                search: false,
                toolbar: false
            }
            return (
                <Form model={model} onValidate={onValidate} layout={'vertical'}>
                    <Table {...tableProps}/>
                </Form>
            )
        }
    }
})
