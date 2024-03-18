import { computed, ref, unref, watch } from 'vue'
import { filter, fromPairs, isBoolean, map } from 'lodash-es'
import { tryOnScopeDispose } from '@/utils'

function useTableColumns (needColumns) {
    const columnsMap = ref({})

    const tableColumns = computed(() => {
        const values = filter(unref(columnsMap), (column) => column.checked)
        return values.sort((a, b) => a.order - b.order)
    })

    const toolbarColumns = computed(() => {
        const values = map(columnsMap.value, (column) => column)
        return values.sort((a, b) => a.order - b.order)
    })

    const stopWatchColumns = watch(needColumns, (columns) => {
        const values = genColumnsMap(columns)
        setColumnsMap(values)
    }, { immediate: true })

    function genColumnsMap (columns) {
        const values = columns.map((column, index) => {
            const checked = isBoolean(column.checked) ? column.checked : true
            const disable = (column.filters || column.sorter) ? true : column.disable
            return [column.key, { ...column, checked, disable, order: index }]
        })
        return fromPairs(values)
    }

    function setColumnsMap (values, reset = false) {
        let sValues = values || {}
        reset && (sValues = genColumnsMap(unref(needColumns)))
        columnsMap.value = sValues
    }

    function onStop () {
        stopWatchColumns && stopWatchColumns()
    }

    tryOnScopeDispose(onStop)

    return { tableColumns, toolbarColumns, setColumnsMap }
}

export default useTableColumns
