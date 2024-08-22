import { ref, watch } from 'vue'
import { tryOnScopeDispose } from '@site-pro/hooks'
import { isFunction } from 'lodash-es'

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

function useSpanConfig (size, props) {
    const { getSpanConfig: propsGetSpanConfig } = props

    // vertical horizontal 只有两种
    const layout = ref('horizontal')
    const span = ref(24)

    const stopWatchSize = watch(size, ({ width }) => {
        const spanSize = propsGetSpanConfig && isFunction(propsGetSpanConfig)
            ? propsGetSpanConfig(props.layout, width) || {}
            : getSpanConfig(props.layout, width)
        // ---
        layout.value = spanSize.layout || 'horizontal'
        span.value = spanSize.span || 24
    })

    function onStop () {
        stopWatchSize && stopWatchSize()
    }

    tryOnScopeDispose(onStop)

    return { layout, span }
}

export default useSpanConfig
