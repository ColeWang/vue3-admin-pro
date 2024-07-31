import { defineComponent, onBeforeUnmount, onMounted, ref, unref } from 'vue'
import { ExitFullscreenOutlined, FullscreenOutlined } from '@/components/icon'
import native from './screenfull'
import { addEvt, cleanEvt } from '@packages/utils/event'
import { useConfigInject } from '@packages/utils/extend'
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
            fullscreenchange && addEvt(document, fullscreenchange, onChange, false)
        })

        onBeforeUnmount(() => {
            fullscreenchange && cleanEvt(document, fullscreenchange, onChange, false)
        })

        return () => {
            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <div class={`${prefixCls.value}-content`} onClick={handleFullscreen}>
                        {unref(fullest) ? <ExitFullscreenOutlined/> : <FullscreenOutlined/>}
                    </div>
                </div>
            )
        }
    }
})
