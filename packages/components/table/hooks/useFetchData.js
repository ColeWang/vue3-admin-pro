import { shallowReactive, watch } from 'vue'
import { tryOnScopeDispose } from '@site-pro/hooks'
import { isFunction, pick } from 'lodash-es'
import { useLocaleReceiver } from '../../locale-provider'

function mergePagination (pagination, t) {
    if (pagination === false) return false
    const { current, pageSize, showTotal, total } = pagination || {}
    const loopShowTotal = (total, range) => {
        return `${t('range')} ${range[0]}-${range[1]} ${t('total')} ${total} ${t('item')}`
    }
    return {
        ...pagination,
        total: total || 0,
        current: current || 1,
        pageSize: pageSize || 10,
        showSizeChanger: true,
        showTotal: showTotal || loopShowTotal
    }
}

function validatePaginate (paginate) {
    const { current, pageSize, total } = paginate
    const maxCurrent = Math.ceil(total / pageSize)
    const overflow = total && current > maxCurrent
    const nextCurrent = overflow ? maxCurrent : current
    return { ...paginate, current: nextCurrent }
}

function useFetchData (request, props, options) {
    const { t } = useLocaleReceiver(['Table', 'pagination'])
    const { onLoad, onRequestError } = options || {}

    const context = shallowReactive({
        loading: false,
        dataSource: props.dataSource || [],
        pagination: mergePagination(props.pagination, t)
    })

    const query = shallowReactive({ params: {}, filter: {}, sort: {} })

    const stopWatchDataSource = watch(() => props.dataSource, (value) => {
        // 手动请求时 更新 dataSource
        context.dataSource = value || []
    }, { immediate: true })

    const stopWatchParams = watch([() => query.params, () => props.params], () => {
        setPaginate({ current: 1 })
        fetchData()
    })

    const stopWatchPagination = watch(() => context.pagination, (value, oldValue) => {
        if (value && oldValue && (value.current !== oldValue.current || value.pageSize !== oldValue.pageSize)) {
            oldValue.pageSize !== value.pageSize && setPaginate({ current: 1 })
            fetchData()
        }
    })

    function getQueryData () {
        const { params, filter, sort } = query
        const nextParams = { ...props.params, ...params }
        const paginate = pick(context.pagination, ['current', 'pageSize'])
        return { params: nextParams, paginate, filter, sort }
    }

    async function fetchData () {
        if (!isFunction(request) || context.loading) return
        context.loading = true
        try {
            const { params, paginate, filter, sort } = getQueryData()
            const { success, data, total } = await request(params, paginate, filter, sort)
            if (success !== false) {
                // postData 不应导致 data 的长度变化, total
                if (props.postData && isFunction(props.postData)) {
                    const nextData = props.postData(data, params, paginate, filter, sort)
                    context.dataSource = nextData || []
                    onLoad && onLoad(nextData)
                } else {
                    context.dataSource = data || []
                    onLoad && onLoad(data)
                }
                setPaginate({ total: total || data.length })
            }
        } catch (err) {
            if (!onRequestError) throw new Error(err)
            onRequestError && onRequestError(err)
        } finally {
            context.loading = false
        }
    }

    function setPaginate (paginate) {
        if (context.pagination === false) return
        const needPaginate = { ...context.pagination, ...paginate }
        context.pagination = validatePaginate(needPaginate)
    }

    function setParams (params) {
        query.params = params
    }

    /* v8 ignore next 3 */
    function setFilter (filter) {
        query.filter = filter
    }

    function setSort (sort) {
        query.sort = sort
    }

    function onReload (resetCurrent = false) {
        resetCurrent && setPaginate({ current: 1 })
        fetchData()
    }

    function onStop () {
        stopWatchDataSource && stopWatchDataSource()
        stopWatchPagination && stopWatchPagination()
        stopWatchParams && stopWatchParams()
    }

    tryOnScopeDispose(onStop)

    return { context, onReload, getQueryData, setParams, setPaginate, setFilter, setSort }
}

export default useFetchData
