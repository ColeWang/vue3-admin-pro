import { computed, unref, watch } from 'vue'
import { tryOnScopeDispose } from '@/utils'

function useResizeObserver (target, callback, options) {
    let observer = undefined
    const isSupported = window && 'ResizeObserver' in window

    function cleanup () {
        observer && observer.disconnect()
        observer = undefined
    }

    const elTarget = computed(() => {
        const plain = unref(target)
        return plain ? (plain.$el || plain) : plain
    })

    const stopWatch = watch(elTarget, (el) => {
        cleanup()
        if (isSupported && window) {
            observer = new ResizeObserver(callback)
            el && observer.observe(el, options)
        }
    }, { immediate: true, flush: 'post', deep: true })

    function onStop () {
        cleanup()
        stopWatch && stopWatch()
    }

    tryOnScopeDispose(onStop)

    return {
        isSupported,
        onStop
    }
}

export default useResizeObserver
