import { shallowReactive, shallowRef, unref, watch } from 'vue'
import { useLocaleReceiver } from '@/components/locale-provider'
import tryOnScopeDispose from '@/utils/hooks/tryOnScopeDispose'
import { isFunction, pick } from 'lodash-es'

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

    const queryParams = shallowRef({})
    const filterParams = shallowRef({})
    const sortParams = shallowRef({})

    async function fetchData () {
        if (!isFunction(request) || context.loading) return
        context.loading = true
        try {
            const params = { ...unref(queryParams), ...props.params }
            const paginate = pick(context.pagination, ['current', 'pageSize'])
            const filter = { ...unref(filterParams) }, sort = { ...unref(sortParams) }
            const { success, data, total } = await request(params, paginate, filter, sort)
            if (success !== false) {
                if (props.postData && isFunction(props.postData)) {
                    const nextData = props.postData(data, params, paginate, filter, sort)
                    context.dataSource = nextData || []
                } else {
                    context.dataSource = data || []
                }
                onLoad && onLoad(data)
                setPaginate({ total: total || data.length })
            }
        } catch (err) {
            if (!onRequestError) throw new Error(err)
            onRequestError && onRequestError(err)
        } finally {
            context.loading = false
        }
    }

    const stopWatchDataSource = watch(() => props.dataSource, (value) => {
        // 手动请求时 更新 dataSource
        context.dataSource = value || []
    }, { immediate: true })

    const stopWatchPagination = watch(() => context.pagination, (value, oldValue) => {
        if (value && oldValue && (value.current !== oldValue.current || value.pageSize !== oldValue.pageSize)) {
            oldValue.pageSize !== value.pageSize && setPaginate({ current: 1 })
            fetchData()
        }
    })

    const stopWatchParams = watch([() => props.params, queryParams], () => {
        setPaginate({ current: 1 })
        fetchData()
    })

    function setQueryParams (params) {
        queryParams.value = params
    }

    function setPaginate (paginate) {
        if (context.pagination === false) return
        const needPaginate = { ...context.pagination, ...paginate }
        context.pagination = validatePaginate(needPaginate)
    }

    function setFilter (filter) {
        filterParams.value = filter
    }

    function setSort (sort) {
        sortParams.value = sort
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

    return { context, onReload, setQueryParams, setPaginate, setFilter, setSort }
}

export default useFetchData
