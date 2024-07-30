import { shallowReactive, watch } from 'vue'
import tryOnScopeDispose from '../../../hooks/tryOnScopeDispose'
import { isFunction } from 'lodash-es'

function useFetchData (request, props, options) {
    const { manualRequest, onLoad, onRequestError } = options || {}

    const context = shallowReactive({
        loading: false,
        dataSource: props.dataSource || {}
    })

    // 主动发起一次请求
    !manualRequest && fetchData()

    async function fetchData () {
        if (!isFunction(request) || context.loading) return
        context.loading = true
        try {
            const { success, data } = await request(props.params)
            if (success !== false) {
                context.dataSource = data || {}
                onLoad && onLoad(data)
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
        context.dataSource = value || {}
    }, { immediate: true })

    function onReload () {
        fetchData()
    }

    function onStop () {
        stopWatchDataSource && stopWatchDataSource()
    }

    tryOnScopeDispose(onStop)

    return { context, onReload }
}

export default useFetchData
