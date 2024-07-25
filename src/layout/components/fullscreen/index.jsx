import { defineComponent, onBeforeUnmount, onMounted, ref, unref } from 'vue'
import { ExitFullscreenOutlined, FullscreenOutlined } from '@/components/icon'
import native from './screenfull'
import { off, on } from '@utils/dom'
import { useConfigInject } from '@utils/extend'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    setup (props, { attrs }) {
        const { prefixCls } = useConfigInject('pro-fullscreen', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        const { fullscreenElement, exitFullscreen, requestFullscreen, fullscreenchange } = native

        const fullest = ref(false)

        function onChange () {
            fullest.value = !unref(fullest)
        }

        function isFullscreen () {
            return fullscreenElement && !!(document[fullscreenElement])
        }

        function handleFullscreen () {
            if (unref(fullest)) {
                exitFullscreen && document[exitFullscreen]()
            } else {
                requestFullscreen && document.body[requestFullscreen]()
            }
        }

        onMounted(() => {
            fullest.value = isFullscreen()
            fullscreenchange && on(document, fullscreenchange, onChange, false)
        })

        onBeforeUnmount(() => {
            fullscreenchange && off(document, fullscreenchange, onChange, false)
        })

        return () => {
            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} onClick={handleFullscreen} {...attrs}>
                    {unref(fullest) ? <ExitFullscreenOutlined/> : <FullscreenOutlined/>}
                </div>
            )
        }
    }
})
