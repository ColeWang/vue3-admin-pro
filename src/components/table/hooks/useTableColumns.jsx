import { Badge, Typography } from 'ant-design-vue'
import { isArray, isFunction, isObject } from 'lodash-es'

function useTableColumns (columns, props) {
    const { action, emptyText } = props
    const baseColumns = genColumnsToTable(columns || [])

    function genColumnsToTable (columns) {
        return columns.map((columnProps, index) => {
            const render = genColumnRender(columnProps)
            const key = columnProps.key || columnProps.dataIndex || String(index)
            const tempColumns = { ...columnProps, key: key, customRender: render }
            if (columnProps.children && isArray(columnProps.children)) {
                tempColumns.children = genColumnsToTable(columnProps.children)
            }
            return tempColumns
        }).filter((columnProps) => {
            return !columnProps.hideInTable
        })
    }

    function genColumnRender (columnProps) {
        if (columnProps.customRender && isFunction(columnProps.customRender)) {
            const oldCustomRender = columnProps.customRender
            return function ({ text, record, index, column }) {
                return oldCustomRender.call(null, text, record, index, action, column)
            }
        }
        // 枚举值
        if (columnProps.valueEnum && isObject(columnProps.valueEnum)) {
            return function ({ text, record, index, column }) {
                const plain = columnProps.valueEnum[text]
                const badgeProps = isObject(plain) ? plain : { text: plain || emptyText }
                return (
                    <Badge {...badgeProps}/>
                )
            }
        }
        // 文本省略 支持复制
        if (columnProps.copyable || columnProps.ellipsis) {
            return function ({ text, record, index, column }) {
                const copyable = (() => {
                    if (columnProps.copyable && text) {
                        if (isObject(columnProps.copyable)) {
                            return { text, ...columnProps.copyable }
                        }
                        return { text, tooltip: true }
                    }
                    return false
                })()
                const ellipsis = (() => {
                    if (isObject(columnProps.ellipsis)) {
                        const { showTitle, ...rest } = columnProps.ellipsis
                        return showTitle !== false ? { ...rest } : false
                    }
                    return { tooltip: true }
                })()

                return (
                    <Typography.Text
                        copyable={copyable}
                        ellipsis={ellipsis}
                        content={text}
                    />
                )
            }
        }
        return undefined
    }

    return { baseColumns }
}

export default useTableColumns
