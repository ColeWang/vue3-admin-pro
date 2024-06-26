import { computed, defineComponent, onMounted, ref, unref, watch } from 'vue'
import { Card, ConfigProvider, Table } from 'ant-design-vue'
import tableProps from './props'
import Search from '../compatible/search'
import Extra from '../compatible/extra'
import Toolbar from '../compatible/toolbar'
import Alert from '../compatible/alert'
import useFetchData from '../hooks/useFetchData'
import useTableColumns from '../hooks/useTableColumns'
import useRowSelection from '../hooks/useRowSelection'
import { createSharedContext } from '../hooks/useSharedContext'
import { getSlot, getSlotVNode } from '@/utils/props-util'
import { omitNil } from '@/utils'
import { isArray, isFunction, omit, pick } from 'lodash-es'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

const BaseTableSize = 'small'

export default defineComponent({
    inheritAttrs: false,
    props: tableProps,
    emits: ['change', 'paginateChange', 'filterChange', 'sortChange', 'loadingChange', 'export', 'sizeChange', 'columnsChange', 'load', 'requestError', 'finish', 'reset'],
    setup (props, { emit, attrs, slots, expose }) {
        const popupContainer = ref(null)
        const tableRef = ref(null)

        const tableSize = ref(props.size || BaseTableSize)

        const {
            context: requestProps,
            onReload,
            getQueryData,
            setParams,
            setPaginate,
            setFilter,
            setSort
        } = useFetchData(props.request, props, {
            onLoad: (dataSource) => emit('load', dataSource),
            onRequestError: (err) => emit('requestError', err)
        })

        const { columns, columnsMap, setColumnsMap } = useTableColumns(props)
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

        // 没搜索的时候 发起请求
        onMounted(() => {
            const ifReload = props.manualRequest === false && props.search === false
            ifReload && onReload(true)
        })

        function onChange (paginate, filters, sorter, extra) {
            emit('change', paginate, filters, sorter, extra)
            const finalAction = {
                paginate: () => {
                    onPaginateChange(paginate)
                },
                /* v8 ignore next 3 */
                filter: () => {
                    onFilterChange(filters)
                },
                sort: () => {
                    if (isArray(sorter)) {
                        /* v8 ignore next 4 */
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
            setPaginate && setPaginate(nextPaginate)
            emit('paginateChange', nextPaginate)
        }

        /* v8 ignore next 5 */
        function onFilterChange (filter) {
            const nextFilter = omitNil(filter)
            setFilter && setFilter(nextFilter)
            emit('filterChange', nextFilter)
        }

        function onSortChange (sort) {
            const nextSort = omitNil(sort)
            setSort && setSort(nextSort)
            emit('sortChange', nextSort)
        }

        function onFinish (values) {
            const nextValues = omitNil(values)
            if (isFunction(props.beforeSearchSubmit)) {
                const result = props.beforeSearchSubmit(nextValues)
                setParams && setParams(result || {})
            } else {
                setParams && setParams(nextValues)
            }
            emit('finish', nextValues)
        }

        function onReset (value) {
            emit('reset', value)
        }

        function onExport () {
            // 当点击查询后 表单数据才会同步到这里, 否则返回的是旧的数据
            // 实时数据需要 Search 传入 model , 此时 model 会响应的更新
            const data = getQueryData && getQueryData()
            const exportParams = {
                pageData: requestProps.dataSource,
                tableElement: unref(tableRef),
                queryData: data || {}
            }
            emit('export', exportParams)
        }

        /* v8 ignore next 4 */
        function setTableSize (value) {
            tableSize.value = value
            emit('sizeChange', value)
        }

        function getPopupContainer () {
            const plain = unref(popupContainer)
            return plain ? (plain.$el || plain) : plain
        }

        createSharedContext({
            requestProps,
            tableSize,
            setTableSize,
            columns,
            columnsMap,
            setColumnsMap,
            onReload: onReload
        })

        expose({
            size: tableSize,
            columns: tableColumns,
            reload: onReload,
            getQueryData: getQueryData,
            cleanSelected: onCleanSelected
        })

        return () => {
            const { search: propsSearch, columns: propsColumns, manualRequest } = props
            const { toolbar: propsToolbar, options: propsOptions, rowSelection: propsRowSelection } = props

            const renderSearch = () => {
                const searchProps = {
                    ...propsSearch,
                    loading: requestProps.loading,
                    columns: propsColumns,
                    manualRequest: manualRequest,
                    onFinish: onFinish,
                    onReset: onReset
                }
                const customSearch = getSlotVNode(slots, {}, 'search', searchProps)
                return customSearch || <Search {...searchProps}/>
            }

            const renderToolbar = () => {
                const titleSlot = getSlot(slots, props, 'title')
                const actionsSlot = getSlot(slots, props, 'actions')
                const settingsSlot = getSlot(slots, props, 'settings')
                const toolbarSlots = {
                    title: titleSlot,
                    actions: actionsSlot,
                    settings: settingsSlot
                }
                const toolbarProps = {
                    options: propsOptions,
                    onExport: onExport
                }
                return <Toolbar {...toolbarProps} v-slots={toolbarSlots}/>
            }

            const renderAlert = () => {
                const alertSlot = getSlot(slots, props, 'alert')
                const alertOptionsSlot = getSlot(slots, props, 'alertOptions')
                const alertSlots = { default: alertSlot, options: alertOptionsSlot }
                const alertProps = {
                    selectedRowKeys: rowSelection.selectedRowKeys,
                    selectedRows: rowSelection.selectedRows,
                    onCleanSelected: onCleanSelected
                }
                return <Alert {...alertProps} v-slots={alertSlots}/>
            }

            const cardBodyStyle = propsToolbar ? ({
                paddingBlock: '16px',
                paddingBlockStart: '0'
            }) : ({
                paddingBlock: '16px'
            })

            const needTableProps = {
                ...attrs,
                ...pick(props, Object.keys(Table.props)),
                ...requestProps,
                size: unref(tableSize),
                columns: unref(tableColumns),
                rowSelection: propsRowSelection !== false ? rowSelection : undefined,
                onChange: onChange
            }

            const needTableSlots = omit(slots, ['search', 'extra', 'title', 'actions', 'settings', 'alert', 'alertOptions'])

            const extraSlotScope = {
                loading: requestProps.loading,
                pageData: requestProps.dataSource,
                pagination: requestProps.pagination
            }
            const extraDom = getSlotVNode(slots, props, 'extra', extraSlotScope)

            return (
                <div class={cx('table')}>
                    {propsSearch !== false && renderSearch()}
                    {extraDom && <Extra>{extraDom}</Extra>}
                    <Card bodyStyle={cardBodyStyle}>
                        {propsToolbar && renderToolbar()}
                        {propsRowSelection !== false && renderAlert()}
                        <ConfigProvider getPopupContainer={getPopupContainer}>
                            <div class={cx('popup-container')} ref={popupContainer}>
                                <div class={cx('table-wrapper')} ref={tableRef}>
                                    <Table {...needTableProps} v-slots={needTableSlots}/>
                                </div>
                            </div>
                        </ConfigProvider>
                    </Card>
                </div>
            )
        }
    }
})
