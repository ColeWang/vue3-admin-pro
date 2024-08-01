import { computed, defineComponent, unref } from 'vue'
import { ExitFullscreenOutlined, FullscreenOutlined } from '@/components/icon'
import { useSite } from '@site'
import { useConfigInject } from '@site/utils/extend'
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
