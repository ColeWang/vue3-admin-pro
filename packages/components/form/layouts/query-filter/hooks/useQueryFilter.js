import { computed, ref, unref, watch } from 'vue'
import useSpanConfig from './useSpanConfig'
import tryOnScopeDispose from '../../../../../hooks/tryOnScopeDispose'
import { flattenChildren } from '../../../../../utils/props-util'
import { isValidElement } from '../../../../../utils/is'
import { map } from 'lodash-es'

function getOffset (length, span) {
    const cols = 24 / span
    return (cols - 1 - (length % cols)) * span
}

function useQueryFilter (size, props) {
    const { showCollapse } = props

    const { layout, span } = useSpanConfig(size, props)

    const collapsed = ref(props.collapsed)
    const showNumber = computed(() => {
        const cols = 24 / unref(span) * props.defaultRowsNumber
        return Math.max(1, cols - 1)
    })

    const stopWatchCollapsed = watch(() => props.collapsed, (value) => {
        collapsed.value = value
    }, { immediate: true })

    function setCollapse (value) {
        collapsed.value = value
    }

    function createNodes (children) {
        const maxIndex = unref(showNumber) - 1
        // 计数器
        let hiddenCount = 0
        const isChildHidden = (propsHidden, index) => {
            propsHidden && (hiddenCount += 1)
            const cHidden = unref(collapsed) && (index - hiddenCount) > maxIndex
            return showCollapse ? (propsHidden || cHidden) : propsHidden
        }

        return children.map((child, index) => {
            const propsHidden = child.props && child.props.hidden || false
            const hidden = isChildHidden(propsHidden, index)
            const key = (isValidElement(child) && child.key) || index
            return { key: key, child: child, hidden: hidden }
        })
    }

    function genColNodes (children, callback) {
        const validChildren = flattenChildren(children || [])
        const nodes = createNodes(validChildren)
        const showNodes = nodes.filter((c) => !c.hidden)
        const offset = getOffset(showNodes.length, unref(span))
        const haveRow = unref(span) + offset === 24
        return { nodes: map(nodes, callback), offset, haveRow }
    }

    function onStop () {
        stopWatchCollapsed && stopWatchCollapsed()
    }

    tryOnScopeDispose(onStop)

    return { layout, span, collapsed, setCollapse, genColNodes }
}

export default useQueryFilter
