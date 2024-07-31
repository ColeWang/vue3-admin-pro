import { computed, h } from 'vue'
import { TypographyText } from 'ant-design-vue'
import { valueEnumToText } from '../../../utils/valueEnum'
import { isEmpty } from '../../../utils/is'
import { isArray, isFunction, isObject } from 'lodash-es'

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
    return function ({ text, ...restArgs }) {
        if (oldColumn.customRender && isFunction(oldColumn.customRender)) {
            const oldCustomRender = oldColumn.customRender
            return oldCustomRender.call(null, { text, ...restArgs })
        }
        if (oldColumn.valueEnum && isObject(oldColumn.valueEnum) && !isEmpty(text)) {
            return valueEnumToText(text, oldColumn.valueEnum)
        }
        if ((oldColumn.copyable || oldColumn.ellipsis) && !isEmpty(text)) {
            const copyable = getCopyable(oldColumn, text)
            const ellipsis = getEllipsis(oldColumn)
            return h(TypographyText, { copyable, ellipsis, content: text })
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
            const key = column.key || column.dataIndex || String(index)
            const tempColumns = { ...column, key: key }
            if (column.children && isArray(column.children)) {
                tempColumns.children = genCustomRenderColumns(column.children)
            } else {
                tempColumns.customRender = customRender(column, props.emptyText)
            }
            return tempColumns
        }).filter((column) => !column.hideInTable)
    }

    return { columns }
}

export default useCustomRender
