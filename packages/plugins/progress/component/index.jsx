import { defineComponent } from 'vue'
import { useConfigInject } from '@site-pro/hooks'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    props: {
        style: {
            type: Object,
            default: () => ({})
        }
    },
    setup (props, { attrs }) {
        const { prefixCls } = useConfigInject('pro-progress', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        return () => {
            const { style } = props

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <div class={`${prefixCls.value}-bar`} style={style}/>
                </div>
            )
        }
    }
})
