import { defineComponent, Fragment, nextTick, onMounted, ref, unref, watch } from 'vue'
import { Card, ConfigProvider, Table } from 'ant-design-vue'
import Search from '../components/search'
import Toolbar from '../components/toolbar'
import useTableColumns from '../hooks/useTableColumns'
import useFetchData from '../hooks/useFetchData'
import { isArray, isFunction, pick } from 'lodash-es'
import tableToExcel from '../tableToExcel'
import { omitNil } from '@/utils'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

const BaseTableSize = 'small'

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
    action: {
        type: Object,
        default: () => ({})
    },
    search: {
        type: [Object, Boolean],
        default: undefined
    },
    toolbar: {
        type: [Object, Boolean],
        default: undefined
    },
    emptyText: {
        type: String,
        default: '-'
    }
}

export default defineComponent({
    inheritAttrs: false,
    props: tableProps,
    emits: ['change', 'paginateChange', 'filterChange', 'sortChange', 'loadingChange', 'load', 'requestError', 'submit', 'reset'],
    setup (props, { emit, attrs, slots, expose }) {
        const popupContainer = ref(null)
        const searchRef = ref(null)
        const tableRef = ref(null)

        const size = ref(props.size || BaseTableSize)
        const { baseColumns, tableColumns, setTableColumns } = useTableColumns(props)

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

        watch(() => requestProps.loading, (value) => {
            emit('loadingChange', value)
        })

        onMounted(() => {
            nextTick().then(() => {
                if (props.manualRequest) return
                if (props.search !== false) {
                    const values = getSearchValues()
                    values && onSubmit(values)
                } else {
                    onReload(false)
                }
            })
        })

        function getSearchValues () {
            const context = unref(searchRef)
            if (context && context.getValues) {
                return context.getValues() || {}
            }
            return {}
        }

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

        function onDensity (value) {
            if (props.toolbar && isFunction(props.toolbar.onDensity)) {
                props.toolbar.onDensity(value)
            }
            size.value = value
        }

        function onSetting (columns) {
            if (props.toolbar && isFunction(props.toolbar.onSetting)) {
                props.toolbar.onSetting(columns)
            }
            setTableColumns(columns)
        }

        function getPopupContainer () {
            const plain = unref(popupContainer)
            return plain ? (plain.$el || plain) : plain
        }

        expose({ reload: onReload, getSearchValues })

        return () => {
            const { title, search, toolbar, columns } = props
            const { title: titleSlot, toolbar: toolbarSlot, search: searchSlot, ...restSlots } = slots

            const searchDom = (() => {
                if (search === false) return null
                const searchProps = {
                    ...search,
                    ref: searchRef,
                    loading: requestProps.loading,
                    columns: columns,
                    onSubmit: onSubmit,
                    onReset: onReset
                }
                if (searchSlot && isFunction(searchSlot)) {
                    return searchSlot(searchProps)
                }
                return (
                    <Search {...searchProps}/>
                )
            })()

            const toolbarDom = (() => {
                if (toolbar === false) return null
                const toolbarSlots = {
                    default: toolbarSlot,
                    title: titleSlot
                }
                return (
                    <Toolbar
                        {...toolbar}
                        title={title}
                        density={unref(size)}
                        loading={requestProps.loading}
                        pageData={requestProps.dataSource}
                        columns={unref(baseColumns)}
                        onReload={onReload}
                        onExport={onExport}
                        onDensity={onDensity}
                        onSetting={onSetting}
                        v-slots={toolbarSlots}
                    />
                )
            })()

            const cardBodyStyle = toolbarDom ? ({
                paddingBlock: '16px',
                paddingBlockStart: '0'
            }) : ({
                paddingBlock: '16px'
            })

            return (
                <div class={cx('table')}>
                    <Fragment>{searchDom}</Fragment>
                    <Card bodyStyle={cardBodyStyle}>
                        <Fragment>{toolbarDom}</Fragment>
                        <ConfigProvider getPopupContainer={getPopupContainer}>
                            <div class={cx('popup-container')} ref={popupContainer}>
                                <div class={cx('table-wrapper')} ref={tableRef}>
                                    <Table
                                        {...attrs}
                                        {...pick(props, Object.keys(Table.props))}
                                        {...requestProps}
                                        size={unref(size)}
                                        columns={unref(tableColumns)}
                                        onChange={onChange}
                                        v-slots={restSlots}
                                    />
                                </div>
                            </div>
                        </ConfigProvider>
                    </Card>
                </div>
            )
        }
    }
})
