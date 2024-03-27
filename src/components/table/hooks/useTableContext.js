import { computed, ref, unref, watch } from 'vue'
import useCustomRender from './useCustomRender'
import { createSharedContext } from './useSharedContext'
import tryOnScopeDispose from '@/utils/hooks/tryOnScopeDispose'
import { fromPairs, isBoolean, isObject, map } from 'lodash-es'

const BaseTableSize = 'small'

function genColumnsMap (columns) {
    const values = columns.map((column, index) => {
        const checked = isBoolean(column.checked) ? column.checked : true
        const disable = (column.filters || column.sorter) ? true : column.disable
        return [column.key, { ...column, checked, disable, order: index }]
    })
    return fromPairs(values)
}

function useTableContext (props) {
    const { columns: baseColumns } = useCustomRender(props)

    const columnsMap = ref({})

    const size = ref(props.size || BaseTableSize)

    const columns = computed(() => {
        const values = map(columnsMap.value, (column) => column)
        return values.sort((a, b) => a.order - b.order)
    })

    const stopWatchColumns = watch(baseColumns, (columns) => {
        columnsMap.value = genColumnsMap(columns)
    }, { immediate: true })

    function setSize (value) {
        size.value = value
    }

    function setColumnsMap (values) {
        const columns = unref(baseColumns)
        if (values && isObject(values)) {
            columnsMap.value = values
        } else {
            columnsMap.value = genColumnsMap(columns)
        }
    }

    function onStop () {
        stopWatchColumns && stopWatchColumns()
    }

    const instance = {
        columnsMap,
        setColumnsMap,
        size,
        setSize,
    }

    createSharedContext(instance)
    tryOnScopeDispose(onStop)

    return { size, columns }
}

export default useTableContext
