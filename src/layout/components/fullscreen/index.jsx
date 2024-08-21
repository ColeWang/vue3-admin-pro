import { computed, defineComponent, unref } from 'vue'
import { useSite } from '@site/plugins'
import { useConfigInject } from '@site/hooks'
import { ExitFullscreenOutlined, FullscreenOutlined } from '@/components/icon'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    setup (props, { attrs }) {
        const { prefixCls } = useConfigInject('pro-fullscreen', props)
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
