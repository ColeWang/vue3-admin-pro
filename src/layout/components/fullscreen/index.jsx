import { computed, defineComponent, unref } from 'vue'
import { useSite } from '@site-pro/plugins'
import { useConfigInject } from '@site-pro/hooks'
import { ExitFullscreenOutlined, FullscreenOutlined } from '@/components/icon'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProLayoutFullscreen',
    setup (props, { attrs }) {
        const { prefixCls } = useConfigInject('pro-layout-fullscreen', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const $site = useSite()

        const isActive = computed(() => $site.fullscreen.isActive)

        function onClick () {
            $site.fullscreen.toggle()
        }

        return () => {
            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <div class={`${prefixCls.value}-content`} onClick={onClick}>
                        {unref(isActive) ? <ExitFullscreenOutlined/> : <FullscreenOutlined/>}
                    </div>
                </div>
            )
        }
    }
})
