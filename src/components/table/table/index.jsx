import { computed, defineComponent, ref, unref, watch } from 'vue'
import { Card, ConfigProvider, Table } from 'ant-design-vue'
import Search from '../compatible/search'
import Toolbar from '../compatible/toolbar'
import Alert from '../compatible/alert'
import useFetchData from '../hooks/useFetchData'
import useRowSelection from '../hooks/useRowSelection'
import useTableContext from '../hooks/useTableContext'
import { omitNil } from '@/utils'
import { isArray, isFunction, pick } from 'lodash-es'
import tableToExcel from '../tableToExcel'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

const tableProps = {
    ...Table.props,
    title: {
        type: Function,
        default: undefined
    },
    scroll: {
        type: Object,
        default: () => ({ x: 'max-content' })
    },
    columns: {
        type: Array,
        default: () => ([])
    },
    manualRequest: {
        type: Boolean,
        default: false
    },
    request: {
        type: Function,
        default: undefined
    },
    params: {
        type: Object,
        default: undefined
    },
    beforeSearchSubmit: {
        type: Function,
        default: undefined
    },
    postData: {
        type: Function,
        default: undefined
    },
    search: {
        type: [Object, Boolean],
        default: undefined
    },
    toolbar: {
        type: [Object, Boolean],
        default: undefined
    },
    rowSelection: {
        type: [Object, Boolean],
        default: false
    },
    emptyText: {
        type: String,
        default: '-'
    },
    onChange: {
        type: Function,
        default: undefined
    },
    onPaginateChange: {
        type: Function,
        default: undefined
    },
    onFilterChange: {
        type: Function,
        default: undefined
    },
    onSortChange: {
        type: Function,
        default: undefined
    },
    onLoadingChange: {
        type: Function,
        default: undefined
    },
    onColumnsChange: {
        type: Function,
        default: undefined
    },
    onLoad: {
        type: Function,
        default: undefined
    },
    onRequestError: {
        type: Function,
        default: undefined
    },
    onSubmit: {
        type: Function,
        default: undefined
    },
    onReset: {
        type: Function,
        default: undefined
    }
}

export default defineComponent({
    inheritAttrs: false,
    props: tableProps,
    emits: ['change', 'paginateChange', 'filterChange', 'sortChange', 'loadingChange', 'columnsChange', 'load', 'requestError', 'submit', 'reset'],
    setup (props, { emit, attrs, slots, expose }) {
        const popupContainer = ref(null)
        const tableRef = ref(null)

        const {
            context: requestProps,
            onReload,
            setQueryParams,
            setPaginate,
            setFilter,
            setSort
        } = useFetchData(props.request, props, {
            onLoad: (dataSource) => emit('load', dataSource),
            onRequestError: (err) => emit('requestError', err)
        })

        const { columns, size } = useTableContext(props)
        const { rowSelection, onCleanSelected } = useRowSelection(props)

        const tableColumns = computed(() => {
            return unref(columns).filter((column) => column.checked)
        })

        watch(() => requestProps.loading, (value) => {
            emit('loadingChange', value)
        })

        watch(tableColumns, (value) => {
            emit('columnsChange', value)
        }, { immediate: true })

        function onChange (paginate, filters, sorter, extra) {
            emit('change', paginate, filters, sorter, extra)
            const finalAction = {
                paginate: () => {
                    onPaginateChange(paginate)
                },
                filter: () => {
                    onFilterChange(filters)
                },
                sort: () => {
                    if (isArray(sorter)) {
                        const data = sorter.reduce((pre, value) => {
                            return { ...pre, [`${value.field}`]: value.order }
                        }, {})
                        onSortChange(data)
                    } else {
                        const sorterOfColumn = sorter.column && sorter.column.sorter
                        const isSortByField = sorterOfColumn && sorterOfColumn.toString() === sorterOfColumn
                        const key = `${isSortByField ? sorterOfColumn : sorter.field}`
                        const data = { [key]: sorter.order }
                        onSortChange(data)
                    }
                }
            }
            finalAction[extra.action] && finalAction[extra.action]()
        }

        function onPaginateChange (paginate) {
            const nextPaginate = pick(paginate, ['current', 'pageSize'])
            setPaginate(nextPaginate)
            emit('paginateChange', nextPaginate)
        }

        function onFilterChange (filter) {
            const nextFilter = omitNil(filter)
            setFilter(nextFilter)
            emit('filterChange', nextFilter)
        }

        function onSortChange (sort) {
            const nextSort = omitNil(sort)
            setSort(nextSort)
            emit('sortChange', nextSort)
        }

        function onSubmit (values) {
            const nextValues = omitNil(values)
            if (isFunction(props.beforeSearchSubmit)) {
                const result = props.beforeSearchSubmit(nextValues)
                setQueryParams(result || {})
            } else {
                setQueryParams(nextValues)
            }
            emit('submit', nextValues)
        }

        function onReset (params) {
            emit('reset', params)
        }

        function onExport () {
            const context = unref(tableRef)
            if (props.toolbar && isFunction(props.toolbar.onExport)) {
                props.toolbar.onExport(context, requestProps.dataSource)
            } else {
                context && tableToExcel(context)
            }
        }

        function getPopupContainer () {
            const plain = unref(popupContainer)
            return plain ? (plain.$el || plain) : plain
        }

        expose({
            reload: onReload,
            cleanSelected: onCleanSelected
        })

        return () => {
            const { search: propsSearch, toolbar: propsToolbar, rowSelection: propsRowSelection } = props
            const { title: propsTitle, columns: propsColumns, manualRequest } = props
            const {
                search: searchSlot,
                toolbar: toolbarSlot,
                title: titleSlot,
                alert: alertSlot,
                ...restSlots
            } = slots

            const renderSearch = () => {
                const searchProps = {
                    ...propsSearch,
                    loading: requestProps.loading,
                    columns: propsColumns,
                    manualRequest: manualRequest,
                    onSubmit: onSubmit,
                    onReset: onReset
                }
                if (searchSlot && isFunction(searchSlot)) {
                    return searchSlot(searchProps)
                }
                return (
                    <Search {...searchProps}/>
                )
            }

            const renderToolbar = () => {
                const toolbarProps = {
                    ...propsToolbar,
                    title: propsTitle,
                    loading: requestProps.loading,
                    size: unref(size),
                    columns: unref(columns),
                    pageData: requestProps.dataSource,
                    onReload: onReload,
                    onExport: onExport
                }
                const toolbarSlots = {
                    default: toolbarSlot,
                    title: titleSlot
                }
                return (
                    <Toolbar {...toolbarProps} v-slots={toolbarSlots}/>
                )
            }

            const renderAlert = () => {
                const alertSlots = { default: alertSlot }
                const alertProps = {
                    selectedRowKeys: rowSelection.selectedRowKeys,
                    selectedRows: rowSelection.selectedRows,
                    onCleanSelected: onCleanSelected
                }
                return (
                    <Alert {...alertProps} v-slots={alertSlots}/>
                )
            }

            const cardBodyStyle = toolbar !== false ? ({
                paddingBlock: '16px',
                paddingBlockStart: '0'
            }) : ({
                paddingBlock: '16px'
            })

            const needTableProps = {
                ...attrs,
                ...pick(props, Object.keys(Table.props)),
                ...requestProps,
                size: unref(size),
                columns: unref(tableColumns),
                rowSelection: propsRowSelection !== false ? rowSelection : undefined,
                onChange: onChange
            }

            return (
                <div class={cx('table')}>
                    {propsSearch !== false && renderSearch()}
                    <Card bodyStyle={cardBodyStyle}>
                        {propsToolbar !== false && renderToolbar()}
                        {propsRowSelection !== false && renderAlert()}
                        <ConfigProvider getPopupContainer={getPopupContainer}>
                            <div class={cx('popup-container')} ref={popupContainer}>
                                <div class={cx('table-wrapper')} ref={tableRef}>
                                    <Table {...needTableProps} v-slots={restSlots}/>
                                </div>
                            </div>
                        </ConfigProvider>
                    </Card>
                </div>
            )
        }
    }
})
