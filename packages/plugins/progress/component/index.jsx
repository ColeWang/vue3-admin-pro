import { defineComponent } from 'vue'
import { useConfigInject } from '../../../utils/extend'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    setup (props, { attrs }) {
        const { prefixCls } = useConfigInject('pro-progress', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        function inc (amount) {

        }

        return () => {
            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <div class={`${prefixCls.value}-bar`}>
                        <div class={`${prefixCls.value}-peg`}/>
                    </div>
                </div>
            )
        }
    }
})
