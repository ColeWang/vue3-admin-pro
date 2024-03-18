import { computed } from 'vue'
import { Badge, Typography } from 'ant-design-vue'
import { isArray, isFunction, isObject } from 'lodash-es'

function columnRender (column, emptyText) {
    if (column.customRender && isFunction(column.customRender)) {
        const oldCustomRender = column.customRender
        return function ({ text, record, index, column }) {
            return oldCustomRender.call(null, text, record, index, column)
        }
    }
    if (column.valueEnum && isObject(column.valueEnum)) {
        return function ({ text, record, index, column }) {
            const plain = column.valueEnum[text]
            const badgeProps = isObject(plain) ? plain : { text: plain || emptyText }
            return (
                <Badge {...badgeProps}/>
            )
        }
    }
    if (column.copyable || column.ellipsis) {
        return function ({ text, record, index, column }) {
            const copyable = (() => {
                if (column.copyable && text) {
                    if (isObject(column.copyable)) {
                        return { text, ...column.copyable }
                    }
                    return { text, tooltip: true }
                }
                return false
            })()
            const ellipsis = (() => {
                if (isObject(column.ellipsis)) {
                    const { showTitle, ...rest } = column.ellipsis
                    return showTitle !== false ? { ...rest } : false
                }
                return { tooltip: true }
            })()

            return (
                <Typography.Text copyable={copyable} ellipsis={ellipsis} content={text}/>
            )
        }
    }
    return undefined
}

function useColumnRender (props) {
    const needColumns = computed(() => {
        return genNeedColumns(props.columns || [], props)
    })

    function genNeedColumns (columns) {
        return columns.map((column, index) => {
            const render = columnRender(column, props.emptyText)
            const key = column.key || column.dataIndex || String(index)
            const tempColumns = { ...column, key: key, customRender: render }
            if (column.children && isArray(column.children)) {
                tempColumns.children = genNeedColumns(column.children)
            }
            return tempColumns
        }).filter((column) => !column.hideInTable)
    }

    return { needColumns }
}

export default useColumnRender
