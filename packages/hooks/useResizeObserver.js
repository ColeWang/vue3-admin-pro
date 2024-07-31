import { computed, watch } from 'vue'
import { getElement } from '../utils/dom'
import tryOnScopeDispose from './tryOnScopeDispose'

function useResizeObserver (target, callback, options) {
    let observer = undefined

    function cleanup () {
        observer && observer.disconnect()
        observer = undefined
    }

    const elTarget = computed(() => getElement(target))

    const stopWatch = watch(elTarget, (el) => {
        cleanup()
        if (window && 'ResizeObserver' in window) {
            observer = new ResizeObserver(callback)
            el && observer.observe(el, options)
        }
    }, { immediate: true, flush: 'post', deep: true })

    function onStop () {
        cleanup()
        stopWatch && stopWatch()
    }

    tryOnScopeDispose(onStop)

    return { onStop }
}

export default useResizeObserver
