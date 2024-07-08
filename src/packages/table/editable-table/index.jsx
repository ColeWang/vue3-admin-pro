import { defineComponent, reactive, watch } from 'vue'
import { Field, Form } from '@/packages/form'
import Table from '../table'
import InlineError from './components/inline-error'
import { get, pick, set, unset } from 'lodash-es'

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
        const validateErrors = reactive([])

        watch(model, (value) => {
            emit('update:value', value)
        }, { deep: true, immediate: true })

        function onValidate (namePath, status, errors) {
            if (!status && errors) {
                set(validateErrors, namePath, errors)
            } else {
                unset(validateErrors, namePath)
            }
        }

        function customRender ({ text, record, index, column }) {
            const { fieldProps, formItemProps } = column
            const namePath = [index, column.key || column.dataIndex]

            const needFormItemProps = {
                ...formItemProps,
                name: namePath,
                label: column.title,
                noStyle: true
            }
            const needFieldProps = {
                ...pick(column, Object.keys(Field.props)),
                fieldProps: { ...fieldProps, style: { width: '100%' } },
                formItemProps: needFormItemProps
            }
            if (needFormItemProps.required || needFormItemProps.rules) {
                const errors = get(validateErrors, namePath)
                return (
                    <InlineError errors={errors}>
                        <Field {...needFieldProps}/>
                    </InlineError>
                )
            }
            return <Field {...needFieldProps}/>
        }

        return () => {
            const { columns: propsColumns } = props

            const columns = propsColumns.map((column) => {
                return { ...column, customRender }
            })

            const formProps = {
                model: model,
                layout: 'vertical',
                onValidate: onValidate
            }

            const tableProps = {
                ...pick(props, Object.keys(Table.props)),
                columns: columns,
                pagination: false,
                search: false,
                toolbar: false
            }
            return (
                <Form {...formProps}>
                    <Table {...tableProps}/>
                </Form>
            )
        }
    }
})
