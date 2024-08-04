import { shallowReactive } from 'vue'
import { isFunction, isObject, toPlainObject } from 'lodash-es'

function mergeRowSelection (defaultValue, rowSelection) {
    const { selectedRowKeys, ...restValue } = defaultValue
    return {
        selectedRowKeys,
        ...toPlainObject(rowSelection),
        ...restValue
    }
}

function useRowSelection (props) {
    const needRowSelection = mergeRowSelection({
        selectedRowKeys: [],
        selectedRows: [],
        onChange: onChange
    }, props.rowSelection)

    const rowSelection = shallowReactive(needRowSelection)

    /* v8 ignore next 14 */
    function setSelectedRowKeys (keys, rows) {
        rowSelection.selectedRowKeys = keys
        if (keys.length !== rows.length) {
            const { rowKey = 'key' } = props
            const { selectedRows } = rowSelection
            rowSelection.selectedRows = keys.map((key) => {
                const oldRow = selectedRows.find((row) => row[rowKey] === key)
                const newRow = rows.find((row) => row[rowKey] === key)
                return oldRow || newRow
            })
        } else {
            rowSelection.selectedRows = rows
        }
    }

    /* v8 ignore next 7 */
    function onChange (keys, rows, info) {
        const { rowSelection } = props
        if (isObject(rowSelection) && isFunction(rowSelection.onChange)) {
            rowSelection.onChange(keys, rows, info)
        }
        setSelectedRowKeys(keys, rows)
    }

    function onCleanSelected () {
        setSelectedRowKeys([], [])
    }

    return { rowSelection, onCleanSelected }
}

export default useRowSelection
