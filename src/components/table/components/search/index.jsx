import { defineComponent, ref, computed, unref, watch } from 'vue'
import { Field } from '@/components/form'
import BaseSearch from './BaseSearch'
import { pick } from 'lodash-es'

function genInitialValues (columns) {
    const values = {}
    columns.forEach((column) => {
        const key = column.key || column.dataIndex
        if (key && column.initialValue) {
            values[key] = column.initialValue
        }
    })
    return values
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
    setup (props, { expose, attrs }) {
        const baseSearchRef = ref(null)
        const defaultSearchColumns = filterSearchColumns(props.columns)
        const initialValues = genInitialValues(defaultSearchColumns)
        const searchColumns = computed(() => filterSearchColumns(props.columns))

        function getValues () {
            const context = unref(baseSearchRef)
            if (context && context.getValues) {
                return context.getValues()
            }
            return {}
        }

        expose({ getValues })

        return () => {
            const baseSearchSlots = {
                default: () => {
                    return unref(searchColumns).map((column) => {
                        const { fieldProps, formItemProps } = column
                        const key = column.key || column.dataIndex
                        const needFormItemProps = {
                            ...formItemProps,
                            name: key,
                            label: column.title
                        }
                        const needFieldProps = {
                            ...column,
                            fieldProps: { ...fieldProps, style: { width: '100%' } },
                            formItemProps: needFormItemProps
                        }
                        return (
                            <Field {...needFieldProps} key={key}/>
                        )
                    })
                }
            }

            const baseSearchProps = {
                ...attrs,
                ...pick(props, Object.keys(BaseSearch.props)),
                initialValues: initialValues
            }

            return (
                <BaseSearch
                    {...baseSearchProps}
                    ref={baseSearchRef}
                    v-slots={baseSearchSlots}
                />
            )
        }
    }
})
