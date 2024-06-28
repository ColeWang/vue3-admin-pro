import { computed, ref, unref, watch } from 'vue'
import tryOnScopeDispose from '@/utils/hooks/tryOnScopeDispose'
import { filterEmptyElement, isValidElement } from '@/utils/props-util'
import { map } from 'lodash-es'

const breakpoints = {
    horizontal: [
        [556, 24, 'vertical'],
        [834, 12, 'horizontal'],
        [1112, 8, 'horizontal'],
        [Infinity, 6, 'horizontal']
    ],
    vertical: [
        [556, 24, 'vertical'],
        [834, 12, 'vertical'],
        [1112, 8, 'vertical'],
        [Infinity, 6, 'vertical']
    ]
}

function getSpanConfig (layout, width) {
    const spanConfig = breakpoints[layout || 'horizontal']
    const breakPoint = spanConfig.find((item) => width < item[0])
    return { span: breakPoint[1], layout: breakPoint[2] }
}

function getOffset (length, span) {
    const cols = 24 / span
    return (cols - 1 - (length % cols)) * span
}

function useQueryFilter (size, props) {
    const { span: propsSpan, showCollapse } = props

    // vertical horizontal 只有两种
    const layout = ref('horizontal')
    const span = ref(24)

    const collapsed = ref(props.collapsed)
    const showNumber = computed(() => {
        const cols = 24 / unref(span) * props.defaultRowsNumber
        return Math.max(1, cols - 1)
    })

    const stopWatchSize = watch(size, ({ width }) => {
        const spanSize = getSpanConfig(props.layout, width)
        layout.value = spanSize.layout
        span.value = (propsSpan || spanSize.span)
    })

    const stopWatchCollapsed = watch(() => props.collapsed, (value) => {
        collapsed.value = value
    }, { immediate: true })

    function setCollapse (value) {
        collapsed.value = value
    }

    function genColNodes (children, callback) {
        //  添加计数 解决位置不对问题
        let hiddenCount = 0

        const nodes = filterEmptyElement(children).map((child, index) => {
            const propsHidden = child.props && child.props.hidden || false
            propsHidden && (hiddenCount += 1)
            const colHidden = propsHidden || unref(collapsed) && (index - hiddenCount > unref(showNumber) - 1)
            const hidden = showCollapse ? colHidden : propsHidden
            const key = (isValidElement(child) && child.key) || index
            return { key: key, child: child, hidden: hidden }
        })
        const { length } = nodes.filter((c) => !c.hidden)
        const offset = getOffset(length, unref(span))
        const haveRow = unref(span) + offset === 24
        return { nodes: map(nodes, callback), offset, haveRow }
    }

    function onStop () {
        stopWatchSize && stopWatchSize()
        stopWatchCollapsed && stopWatchCollapsed()
    }

    tryOnScopeDispose(onStop)

    return { layout, span, collapsed, setCollapse, genColNodes }
}

export default useQueryFilter
