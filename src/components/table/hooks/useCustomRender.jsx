import { computed } from 'vue'
import { Badge, Typography } from 'ant-design-vue'
import { isArray, isFunction, isObject } from 'lodash-es'
import { isEmpty } from '@/utils'

function getEllipsis (column) {
    if (column.ellipsis && column.ellipsis.showTitle === false) {
        return false
    }
    return column.ellipsis
}

function getCopyable (column, text) {
    if (column.copyable && text) {
        if (isObject(column.copyable)) {
            return { text, ...column.copyable }
        }
        return { text, tooltip: true }
    }
    return false
}

function customRender (oldColumn, emptyText) {
    return function ({ text, record, index, column }) {
        if (oldColumn.customRender && isFunction(oldColumn.customRender)) {
            const oldCustomRender = oldColumn.customRender
            return oldCustomRender.apply(null, [text, record, index, column])
        }
        if (oldColumn.valueEnum && isObject(oldColumn.valueEnum)) {
            const plain = oldColumn.valueEnum[text] || emptyText
            const badgeProps = isObject(plain) ? plain : { text: plain }
            return <Badge {...badgeProps}/>
        }
        if (oldColumn.copyable || oldColumn.ellipsis) {
            const copyable = getCopyable(oldColumn, text)
            const ellipsis = getEllipsis(oldColumn)
            return (
                <Typography.Text
                    copyable={copyable}
                    ellipsis={ellipsis}
                    content={text}
                />
            )
        }
        return isEmpty(text) ? emptyText : text
    }
}

function useCustomRender (props) {
    const columns = computed(() => {
        return genCustomRenderColumns(props.columns || [])
    })

    function genCustomRenderColumns (columns) {
        return columns.map((column, index) => {
            const render = customRender(column, props.emptyText)
            const key = column.key || column.dataIndex || String(index)
            const tempColumns = { ...column, key: key, customRender: render }
            if (column.children && isArray(column.children)) {
                tempColumns.children = genCustomRenderColumns(column.children)
            }
            return tempColumns
        }).filter((column) => !column.hideInTable)
    }

    return { columns }
}

export default useCustomRender
