import { defineComponent, ref, shallowRef, unref, watch } from 'vue'
import { Field, QueryFilter } from '@/components/form'
import { Card } from 'ant-design-vue'
import { isArray } from 'lodash-es'
import { cloneProxyToRaw } from '@/utils'

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...QueryFilter.props,
        columns: {
            type: Array,
            default: () => ([])
        }
    },
    setup (props, { expose, attrs }) {
        const queryFilterRef = ref(null)

        const baseSearchColumns = genColumnsToSearch(props.columns)
        const initialValues = genInitialValues(baseSearchColumns)
        const searchColumns = shallowRef([])

        watch(() => props.columns, (values) => {
            searchColumns.value = genColumnsToSearch(values)
        }, { immediate: true })

        function genColumnsToSearch (columns) {
            const columnsArray = []

            function loopColumns (columns) {
                columns.forEach((columnProps) => {
                    const tempColumns = { ...columnProps }
                    if (columnProps.children && isArray(columnProps.children)) {
                        loopColumns(columnProps.children)
                    }
                    columnsArray.push(tempColumns)
                })
            }

            loopColumns(columns)
            return columnsArray.filter((columnProps) => columnProps.search)
        }

        function genInitialValues (columns) {
            const values = {}
            columns.forEach((columnProps) => {
                const columnKey = columnProps.key || columnProps.dataIndex
                if (columnKey && columnProps.initialValue) {
                    values[columnKey] = columnProps.initialValue
                }
            })
            return values
        }

        function getValues () {
            const context = unref(queryFilterRef)
            if (context && context.getFormInstance) {
                const formInstance = context.getFormInstance()
                const { model } = formInstance
                return cloneProxyToRaw(unref(model))
            }
            return {}
        }

        expose({ getValues })

        return () => {
            const cardProps = {
                bodyStyle: {
                    paddingInline: '24px'
                },
                style: {
                    marginBottom: '16px'
                }
            }

            const queryFilterSlots = {
                default: (slotScope) => {
                    return unref(searchColumns).map((columnProps) => {
                        const { fieldProps, formItemProps } = columnProps
                        const formFieldProps = {
                            ...columnProps,
                            fieldProps: {
                                ...fieldProps,
                                style: { width: '100%' }
                            },
                            formItemProps: {
                                ...slotScope.props,
                                ...formItemProps,
                                label: columnProps.title,
                                name: columnProps.key || columnProps.dataIndex
                            }
                        }
                        return <Field {...formFieldProps}/>
                    })
                }
            }

            const queryFilterProps = {
                ...props, ...attrs,
                initialValues: initialValues
            }

            return (
                <Card {...cardProps}>
                    <QueryFilter
                        ref={queryFilterRef}
                        {...queryFilterProps}
                        v-slots={queryFilterSlots}
                    />
                </Card>
            )
        }
    }
})
