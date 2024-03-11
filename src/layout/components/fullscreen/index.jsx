import { defineComponent, onBeforeUnmount, onMounted, ref, unref } from 'vue'
import { FullscreenOutlined, ExitFullscreenOutlined } from '@/icons'
import NativeAPI from './screenfull'
import { off, on } from '@/utils/dom'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    inheritAttrs: false,
    setup () {
        const fullest = ref(false)

        function onChange () {
            fullest.value = !unref(fullest)
        }

        function isFullscreen () {
            if (!NativeAPI) return false
            return !!(document[NativeAPI.fullscreenElement])
        }

        function handleFullscreen () {
            if (!NativeAPI) return false
            if (unref(fullest)) {
                document[NativeAPI.exitFullscreen]()
            } else {
                document.body[NativeAPI.requestFullscreen]()
            }
        }

        onMounted(() => {
            fullest.value = isFullscreen()
            NativeAPI && on(document, NativeAPI.fullscreenchange, onChange, false)
        })

        onBeforeUnmount(() => {
            NativeAPI && off(document, NativeAPI.fullscreenchange, onChange, false)
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
