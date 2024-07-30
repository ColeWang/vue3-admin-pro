import { defineComponent } from 'vue'
import { useConfigInject } from '@packages/utils/extend'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    setup (props, { attrs }) {
        const { prefixCls } = useConfigInject('pro-base-layout', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        function inc (amount) {

        }

        return () => {
            return wrapSSR(
                <div class={[prefixCls.values, hashId.value]} {...attrs}>
                    <div class={`${prefixCls.value}-bar`}>
                        <div class={`${prefixCls.value}-peg`}/>
                    </div>
                </div>
            )
        }
    }
})
