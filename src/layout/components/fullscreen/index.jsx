import { defineComponent, onBeforeUnmount, onMounted, ref, unref } from 'vue'
import { ExitFullscreenOutlined, FullscreenOutlined } from '@/components/icon'
import native from './screenfull'
import { off, on } from '@/packages/_utils/dom'
import classNames from '@/packages/_utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    inheritAttrs: false,
    setup () {
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
            return (
                <div class={cx('fullscreen')} onClick={handleFullscreen}>
                    {unref(fullest) ? <ExitFullscreenOutlined/> : <FullscreenOutlined/>}
                </div>
            )
        }
    }
})
