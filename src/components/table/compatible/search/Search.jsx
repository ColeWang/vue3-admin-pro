import { computed, defineComponent, unref } from 'vue'
import { Field } from '@/components/form'
import BaseSearch from './BaseSearch'
import { pick, set, toString } from 'lodash-es'
import { isEmpty } from '@/utils'

function genInitialValues (columns) {
    const result = {}
    columns.forEach((column) => {
        const namePath = column.key || column.dataIndex
        if (namePath && !isEmpty(column.initialValue)) {
            set(result, namePath, column.initialValue)
        }
    })
    return result
}

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
        const defaultSearchColumns = filterSearchColumns(props.columns)
        const initialValues = genInitialValues(defaultSearchColumns)
        const searchColumns = computed(() => filterSearchColumns(props.columns))

        return () => {
            const baseSearchSlots = {
                default: () => {
                    return unref(searchColumns).map((column) => {
                        const { fieldProps, formItemProps } = column
                        const namePath = column.key || column.dataIndex

                        const needFormItemProps = {
                            ...formItemProps,
                            name: namePath,
                            label: column.title
                        }
                        const needFieldProps = {
                            ...column,
                            fieldProps: { ...fieldProps, style: { width: '100%' } },
                            formItemProps: needFormItemProps
                        }
                        const key = toString(namePath)
                        return <Field {...needFieldProps} key={key}/>
                    })
                }
            }

            const baseSearchProps = {
                ...attrs,
                ...pick(props, Object.keys(BaseSearch.props)),
                initialValues: initialValues
            }

            return (
                <BaseSearch {...baseSearchProps} v-slots={baseSearchSlots}/>
            )
        }
    }
})
