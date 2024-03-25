import { computed, ref, unref, watch } from 'vue'
import { filterEmptyElement, isValidElement, tryOnScopeDispose } from '@/utils'
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
    const { collapseRender, span: propsSpan } = props

    const layout = ref('vertical')
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
        const nodes = filterEmptyElement(children).map((child, index) => {
            const propsHidden = child.props && child.props.hidden || false
            const colHidden = propsHidden || unref(collapsed) && (index > unref(showNumber) - 1)
            const hidden = collapseRender ? colHidden : propsHidden
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
