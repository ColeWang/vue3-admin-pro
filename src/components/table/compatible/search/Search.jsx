import { computed, defineComponent, unref } from 'vue'
import { Field } from '@/components/form'
import BaseSearch from './BaseSearch'
import { namePathToString } from '@/components/form/utils'
import { pick, set, transform } from 'lodash-es'
import { isEmpty } from '@/utils'

function filterSearchColumns (columns) {
    return columns.filter((column) => column.search)
}

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...BaseSearch.props,
        columns: {
            type: Array,
            default: () => ([])
        }
    },
    setup (props, { attrs }) {
        const defaultColumns = filterSearchColumns(props.columns)
        const initialValues = transform(defaultColumns, (result, column) => {
            const namePath = column.key || column.dataIndex
            if (namePath && !isEmpty(column.initialValue)) {
                return set(result, namePath, column.initialValue)
            }
            return result
        }, {})

        const searchColumns = computed(() => filterSearchColumns(props.columns))

        return () => {
            const baseSearchProps = {
                ...attrs,
                ...pick(props, Object.keys(BaseSearch.props)),
                initialValues: initialValues
            }

            return (
                <BaseSearch {...baseSearchProps}>
                    {unref(searchColumns).map((column) => {
                        const { fieldProps, formItemProps } = column
                        const namePath = column.key || column.dataIndex

                        const needFormItemProps = {
                            ...formItemProps,
                            name: namePath,
                            label: column.title
                        }
                        const needFieldProps = {
                            ...pick(column, Object.keys(Field.props)),
                            fieldProps: { ...fieldProps, style: { width: '100%' } },
                            formItemProps: needFormItemProps
                        }
                        const key = namePathToString(namePath)
                        return <Field {...needFieldProps} key={key}/>
                    })}
                </BaseSearch>
            )
        }
    }
})
